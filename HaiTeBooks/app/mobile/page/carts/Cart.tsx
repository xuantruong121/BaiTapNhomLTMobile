import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type CartItem = {
  id: number;
  title: string;
  price: number; // current price
  oldPrice?: number; // optional strikethrough price
  image: string;
  qty: number;
  checked: boolean;
};

const initialItems: CartItem[] = [
  {
    id: 1,
    title: "Truyện Kể Cho Bé Trước Giờ Đi Ngủ - Giúp Bé Phát...",
    price: 66000,
    oldPrice: 78000,
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=640&h=640&fit=crop",
    qty: 1,
    checked: false,
  },
  {
    id: 2,
    title: "Khu Rừng Đom Đóm (Tái Bản) - Tặng Kèm Lót Ly +...",
    price: 61500,
    oldPrice: 68000,
    image:
      "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=640&h=640&fit=crop",
    qty: 1,
    checked: false,
  },
];

const CartScreen: React.FC = () => {
  const [items, setItems] = useState<CartItem[]>(initialItems);

  const allChecked = useMemo(
    () => items.length > 0 && items.every((i) => i.checked),
    [items]
  );

  const totalSelectedQty = useMemo(
    () => items.filter((i) => i.checked).reduce((s, i) => s + i.qty, 0),
    [items]
  );

  const totalPrice = useMemo(
    () =>
      items
        .filter((i) => i.checked)
        .reduce((sum, i) => sum + i.price * i.qty, 0),
    [items]
  );

  const toggleAll = () => {
    setItems((prev) => prev.map((i) => ({ ...i, checked: !allChecked })));
  };

  const toggleOne = (id: number) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, checked: !i.checked } : i))
    );
  };

  const increase = (id: number) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i))
    );
  };

  const decrease = (id: number) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, i.qty - 1) } : i))
    );
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const renderItem = ({ item }: { item: CartItem }) => (
    <View style={styles.itemRow}>
      <TouchableOpacity
        style={styles.checkbox}
        onPress={() => toggleOne(item.id)}
      >
        {item.checked ? (
          <Ionicons name="checkmark" size={16} color="#FFFFFF" />
        ) : null}
      </TouchableOpacity>

      <Image source={{ uri: item.image }} style={styles.itemImage} />

      <View style={styles.itemInfo}>
        <Text style={styles.itemTitle} numberOfLines={2}>
          {item.title}
        </Text>

        <View style={styles.priceRow}>
          <Text style={styles.price}>{formatVnd(item.price)}</Text>
          {item.oldPrice ? (
            <Text style={styles.oldPrice}>{formatVnd(item.oldPrice)}</Text>
          ) : null}
        </View>

        <View style={styles.qtyRow}>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => decrease(item.id)}
          >
            <Text style={styles.qtyBtnText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.qtyValue}>{item.qty}</Text>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => increase(item.id)}
          >
            <Text style={styles.qtyBtnText}>+</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.trashBtn}
            onPress={() => removeItem(item.id)}
          >
            <Ionicons name="trash-outline" size={20} color="#111827" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Giỏ hàng</Text>
      </View>

      <View style={styles.selectAllRow}>
        <TouchableOpacity style={styles.checkbox} onPress={toggleAll}>
          {allChecked ? (
            <Ionicons name="checkmark" size={16} color="#FFFFFF" />
          ) : null}
        </TouchableOpacity>
        <Text style={styles.selectAllText}>
          Chọn tất cả ({items.length} sản phẩm)
        </Text>
      </View>

      <FlatList
        data={items}
        keyExtractor={(it) => String(it.id)}
        contentContainerStyle={styles.listContent}
        renderItem={renderItem}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>Giỏ hàng trống</Text>
          </View>
        }
      />

      <View style={styles.footer}>
        <View style={styles.totalBox}>
          <Text style={styles.totalLabel}>Thành tiền</Text>
          <Text style={styles.totalValue}>{formatVnd(totalPrice)}</Text>
        </View>
        <TouchableOpacity
          style={styles.checkoutBtn}
          disabled={totalSelectedQty === 0}
        >
          <Text style={styles.checkoutText}>Thanh toán</Text>
          <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

function formatVnd(n: number) {
  if (!n) return "0 đ";
  return `${n.toLocaleString("vi-VN")} đ`;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  header: {
    backgroundColor: "#C92127",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },
  headerTitle: { color: "#FFFFFF", fontSize: 18, fontWeight: "800" },

  selectAllRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    alignItems: "center",
    justifyContent: "center",
  },
  selectAllText: { color: "#111827" },

  listContent: { paddingHorizontal: 16, paddingBottom: 120, gap: 12 },
  itemRow: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    padding: 12,
    gap: 12,
  },
  itemImage: {
    width: 68,
    height: 90,
    borderRadius: 6,
    backgroundColor: "#F3F4F6",
  },
  itemInfo: { flex: 1 },
  itemTitle: { color: "#111827", fontWeight: "700" },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 8,
  },
  price: { color: "#C92127", fontWeight: "800" },
  oldPrice: { color: "#9CA3AF", textDecorationLine: "line-through" },
  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 10,
  },
  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  qtyBtnText: { color: "#111827", fontSize: 16, fontWeight: "800" },
  qtyValue: {
    width: 24,
    textAlign: "center",
    color: "#111827",
    fontWeight: "700",
  },
  trashBtn: { marginLeft: "auto" },

  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  totalBox: { flex: 1 },
  totalLabel: { color: "#6B7280", fontSize: 12 },
  totalValue: { color: "#111827", fontSize: 16, fontWeight: "800" },
  checkoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#FCA5A5",
    borderRadius: 999,
  },
  checkoutText: { color: "#FFFFFF", fontWeight: "800" },
  emptyBox: { padding: 24, alignItems: "center" },
  emptyText: { color: "#6B7280" },
});

export default CartScreen;
