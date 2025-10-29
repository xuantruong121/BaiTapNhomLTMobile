import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import ProductCard from '../components/home/ProductCard';

type Book = {
  id: number;
  title: string;
  author: string;
  price: number;
  stock: number;
  description: string;
  image_url: string;
  category_id: number;
};

type Review = {
  book_id: number;
  user_id: number;
  rating: number; // 1..5
  comment?: string;
};

const BOOKS: Book[] = [
  {
    id: 1,
    title: 'Thơ - Ấn Bản Đặc Biệt 20 Năm Thành Lập Nhà...',
    author: 'Nhiều tác giả',
    price: 364500,
    stock: 120,
    description: 'Mô tả sách... ',
    image_url: 'https://i.imgur.com/1QgrNNw.png',
    category_id: 1,
  },
  {
    id: 2,
    title: 'Hồ Chí Minh - Tiểu sử Bằng Hình',
    author: 'Tác giả A',
    price: 2000000,
    stock: 8,
    description: 'Mô tả sách...',
    image_url: 'https://i.imgur.com/1QgrNNw.png',
    category_id: 1,
  },
  {
    id: 3,
    title: 'Quản trị tinh gọn phiên bản mới',
    author: 'Tác giả B',
    price: 150000,
    stock: 30,
    description: 'Mô tả...',
    image_url: 'https://i.imgur.com/1QgrNNw.png',
    category_id: 2,
  },
  {
    id: 4,
    title: 'Quản trị tinh gọn phiên bản mới',
    author: 'Tác giả B',
    price: 150000,
    stock: 30,
    description: 'Mô tả...',
    image_url: 'https://i.imgur.com/1QgrNNw.png',
    category_id: 2,
  },
  {
    id: 5,
    title: 'Quản trị tinh gọn phiên bản mới',
    author: 'Tác giả B',
    price: 150000,
    stock: 30,
    description: 'Mô tả...',
    image_url: 'https://i.imgur.com/1QgrNNw.png',
    category_id: 2,
  },
];

const REVIEWS: Review[] = [
  { book_id: 1, user_id: 1, rating: 4.5 },
  { book_id: 1, user_id: 2, rating: 4.0 },
  { book_id: 2, user_id: 3, rating: 4.8 },
  { book_id: 3, user_id: 4, rating: 4.2 },
  { book_id: 3, user_id: 5, rating: 4.0 },
  { book_id: 4, user_id: 6, rating: 4.0 },
  { book_id: 5, user_id: 7, rating: 4.0 },
];

const CATEGORY_NAMES: Record<number, string> = {
  1: 'Văn học',
  2: 'Kinh tế',
};

function formatCurrency(v: number) {
  return new Intl.NumberFormat('vi-VN').format(v) + ' đ';
}

function getAverageRating(bookId: number): number | undefined {
  const rs = REVIEWS.filter(r => r.book_id === bookId);
  if (rs.length === 0) return undefined;
  const avg = rs.reduce((s, r) => s + r.rating, 0) / rs.length;
  return Math.round(avg * 10) / 10;
}

const Home: React.FC = () => {
  const sections = Array.from(new Set(BOOKS.map(b => CATEGORY_NAMES[b.category_id] || `Category ${b.category_id}`)));
  return (
    <ScrollView style={styles.container}>
      {sections.map(section => (
        <View key={section} style={styles.section}>
          <Text style={styles.sectionTitle}>{section}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
            {BOOKS.filter(b => (CATEGORY_NAMES[b.category_id] || `Category ${b.category_id}`) === section).map((b) => (
              <ProductCard
                key={b.id}
                category={section}
                title={b.title}
                price={formatCurrency(b.price)}
                stock={b.stock}
                rating={getAverageRating(b.id)}
                imageUrl={b.image_url}
              />
            ))}
          </ScrollView>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  section: { paddingTop: 8, paddingBottom: 12, backgroundColor: '#fff' },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#1F2937', paddingHorizontal: 12, paddingBottom: 8 },
  row: { paddingHorizontal: 12, gap: 12 },
});

export default Home;