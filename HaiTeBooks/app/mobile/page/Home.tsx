import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ProductCard from "../components/home/ProductCard";

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

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = Math.round((SCREEN_WIDTH - 12 * 3) / 2);
function formatCurrency(v: number) {
  return new Intl.NumberFormat("vi-VN").format(v) + " đ";
}

const Home: React.FC = () => {
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
            err?.response?.data?.message ?? err.message ?? "Lỗi khi lấy dữ liệu"
          );
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchBooks();
    return () => {
      mounted = false;
      source.cancel();
    };
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", flex: 1 }]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, { justifyContent: "center", flex: 1 }]}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <ProductCard />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // kept only styles actually used in this file
  container: { flex: 1, backgroundColor: "#fff" },
  section: { paddingTop: 8, paddingBottom: 12, backgroundColor: "#fff" },
  error: { color: "#e74c3c", textAlign: "center" },
});
export default Home;
