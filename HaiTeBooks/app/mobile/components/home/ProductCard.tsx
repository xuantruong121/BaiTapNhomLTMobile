import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Platform, StyleSheet, Text, View } from 'react-native';
import BuyNowButton from './BuyNowButton';

export interface ProductCardProps {
  title: string;
  price: string;
  oldPrice?: string;
  badge?: string;
  image?: any;
  imageUrl?: string;
  category?: string;
  discountLabel?: string;
  soldLabel?: string;
  progressPercent?: number;
  stock?: number;
  rating?: number;
  onBuy?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, price, oldPrice, badge, image, imageUrl, category, discountLabel, soldLabel = 'Đã bán 10', progressPercent = 60, stock, rating, onBuy }) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardImageWrap}>
        {badge ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        ) : null}
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.cardImage} />
        ) : (
          <Image source={image as any} style={styles.cardImage} />
        )}
      </View>
      {category ? <Text style={styles.category}>{category}</Text> : null}
      <View style={styles.titleWrap}>
        <Text numberOfLines={2} style={styles.cardTitle}>{title}</Text>
      </View>
      {typeof rating === 'number' ? (
        <View style={styles.ratingRow}>
          <Ionicons name="star" size={14} color="#F59E0B" />
          <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
        </View>
      ) : null}
      <View style={styles.priceRow}>
        <Text style={styles.cardPrice}>{price}</Text>
      </View>
      <Text style={styles.soldText}>{typeof stock === 'number' ? `Còn ${stock}` : soldLabel}</Text>
      <BuyNowButton onPress={onBuy} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 180,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: 12,
    backgroundColor: '#fff',
    padding: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.04,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  cardImageWrap: {
    height: 170,
    borderRadius: 10,
    backgroundColor: '#FAFAFA',
    marginBottom: 10,
    overflow: 'hidden',
  },
  badge: {
    position: 'absolute',
    top: 6,
    left: 6,
    zIndex: 2,
    backgroundColor: '#E6F4FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 10,
    color: '#0077CC',
    fontWeight: '700',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  cardTitle: {
    fontSize: 13,
    color: '#2E2E2E',
    lineHeight: 17,
  },
  titleWrap: {
    minHeight: 34,
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  category: {
    fontSize: 11,
    color: '#697386',
    marginBottom: 4,
    fontWeight: '600',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 6,
  },
  ratingText: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '600',
  },
  cardPrice: {
    fontSize: 16,
    color: '#C92127',
    fontWeight: '800',
  },
  cardOldPrice: {
    fontSize: 12,
    color: '#A1A1A1',
    textDecorationLine: 'line-through',
    marginTop: 2,
    marginBottom: 6,
  },
  discountPill: {
    backgroundColor: '#C92127',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  discountText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#F3F3F3',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFCDD2',
  },
  soldText: {
    fontSize: 11,
    color: '#8C8C8C',
    marginTop: 6,
  },
});

export default ProductCard;


