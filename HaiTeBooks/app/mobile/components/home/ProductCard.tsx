import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import BuyNowButton from "./BuyNowButton";

type ApiBook = {
  id: number;
  title: string;
  author?: string;
  price: number;
  stock: number;
  description?: string;
  imageUrl?: string;
  barcode?: string;
  categoryName?: string;
};

const formatPrice = (v: number) =>
  new Intl.NumberFormat("vi-VN").format(v) + " đ";

const Card: React.FC<{ item: ApiBook }> = ({ item }) => {
  const uri =
    item.barcode || item.imageUrl || "https://via.placeholder.com/300x400";
  return (
    <View style={styles.card}>
      <View style={styles.imageWrap}>
        <Image source={{ uri }} style={styles.image} resizeMode="cover" />
      </View>

      <View style={styles.info}>
        <Text style={styles.category} numberOfLines={1}>
          {item.categoryName || "Khác"}
        </Text>

        {/* Title wrapped in fixed-height box so all titles align */}
        <View style={styles.titleWrap}>
          <Text style={styles.title} numberOfLines={2}>
            {item.title}
          </Text>
        </View>

        <View style={styles.metaRow}>
          <Text style={styles.price}>{formatPrice(item.price)}</Text>
          <Text style={styles.stock}>Còn {item.stock}</Text>
        </View>

        <View style={styles.buyWrap}>
          <BuyNowButton
            onPress={() => {
              /* handle buy */
            }}
          />
        </View>
      </View>
    </View>
  );
};

const ProductCard: React.FC = () => {
  const [books, setBooks] = useState<ApiBook[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const source = axios.CancelToken.source();

    const fetchBooks = async () => {
      try {
        const resp = await axios.get<ApiBook[]>(
          "http://192.168.100.156:8080/api/books",
          { timeout: 10000, cancelToken: source.token }
        );
        if (mounted) setBooks(resp.data || []);
      } catch (err: any) {
        if (axios.isCancel(err)) return;
        if (mounted)
          setError(
            err?.response?.data?.message ??
              err.message ??
              "Lỗi khi lấy dữ liệu từ API"
          );
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchBooks();
    return () => {
      mounted = false;
      source.cancel("Component unmounted");
    };
  }, []);

  // group books by categoryName
  const sections = useMemo(() => {
    const map = books.reduce<Record<string, ApiBook[]>>((acc, b) => {
      const key =
        b.categoryName?.trim() && b.categoryName!.trim().length > 0
          ? b.categoryName!
          : "Khác";
      if (!acc[key]) acc[key] = [];
      acc[key].push(b);
      return acc;
    }, {});
    return map;
  }, [books]);

  if (loading) return <ActivityIndicator style={{ margin: 12 }} />;

  if (error) return <Text style={styles.error}>{error}</Text>;

  return (
    <View>
      {Object.entries(sections).map(([category, items]) => (
        <View key={category} style={styles.section}>
          <Text style={styles.sectionTitle}>{category}</Text>

          <FlatList
            data={items}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => <Card item={item} />}
          />
        </View>
      ))}
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignItems: "flex-start",
  },
  section: {
    marginBottom: 14,
  },
  sectionTitle: {
    paddingHorizontal: 12,
    fontSize: 16,
    fontWeight: "700",
    color: "#C5181A",
    marginBottom: 8,
  },
  card: {
    width: 180,
    marginRight: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#C5181A",
    elevation: 3,
  },
  imageWrap: {
    width: "100%",
    height: 150,
    backgroundColor: "#fbfbfb",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "94%",
    height: "94%",
    borderRadius: 8,
    backgroundColor: "#f6f6f6",
  },
  info: {
    padding: 12,
    // make info area consistent so elements align across cards
    minHeight: 120,
    justifyContent: "flex-start",
  },
  category: {
    fontSize: 12,
    color: "#9CA3AF",
    marginBottom: 6,
  },
  // ensure title area has fixed height (2 lines) so neighbouring cards align
  titleWrap: {
    height: 44, // đủ cho 2 dòng với fontSize 14 + lineHeight 18
    marginBottom: 6,
  },
  title: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
    lineHeight: 18,
  },
  // meta row holds price and stock horizontally aligned
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: "800",
    color: "#C5181A",
  },
  stock: {
    fontSize: 12,
    color: "#6B7280",
  },
  buyWrap: {
    marginTop: 8,
  },
  error: { color: "#e74c3c", textAlign: "center", marginTop: 12 },
});
