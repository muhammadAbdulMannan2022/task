// @ts-nocheck
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
const HERO_CARD_WIDTH = width - 40; 


const CATEGORIES = [
  { id: "1", name: "Jersey", icon: "shirt", active: true },
  { id: "2", name: "Football", icon: "football", active: false },
  { id: "3", name: "Track suit", icon: "body", active: false },
  { id: "4", name: "Accessories", icon: "watch", active: false },
];

const POPULAR_PRODUCTS = [
  {
    id: "1",
    name: "Featured Cap",
    price: "$280",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&q=80",
  },
  {
    id: "2",
    name: "Premium Jersey",
    price: "$280",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&q=80",
  },
  {
    id: "3",
    name: "T-shirts",
    price: "$280",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80",
  },
];

const BEST_SELLERS = [
  {
    id: "1",
    name: "Featured Cap",
    price: "$280",
    image: "https://images.unsplash.com/photo-1523380744952-b7e00e6e2ffa?w=400&q=80",
  },
  {
    id: "2",
    name: "Featured Cap",
    price: "$280",
    image: "https://images.unsplash.com/photo-1587132137056-bfbf0166836e?w=400&q=80",
  },
  {
    id: "3",
    name: "Featured Cap",
    price: "$280",
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&q=80",
  },
];

import { useRouter } from "expo-router";



export default function ShopScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Shop</Text>
        <TouchableOpacity 
          style={styles.notificationButton}
          onPress={() => router.push("/notifications")}
        >
          <Ionicons name="notifications-outline" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#94A3B8" />
          <TextInput
            placeholder="Type here"
            placeholderTextColor="#94A3B8"
            style={styles.searchInput}
          />
        </View>

        {/* sl 1 */}
        <View style={styles.heroContainer}>
          <FlatList
            data={[
              { id: "1", image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800&q=80" },
              { id: "2", image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&q=80" },
              { id: "3", image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80" },
            ]}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.heroCard}>
                <Image source={{ uri: item.image }} style={styles.heroImage} />
                <LinearGradient
                  colors={["transparent", "rgba(0,0,0,0.6)"]}
                  style={styles.heroOverlay}
                >
                  <TouchableOpacity style={styles.shopNowButton}>
                    <Text style={styles.shopNowText}>Shop Now</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.heroList}
            snapToAlignment="center"
            decelerationRate="fast"
          />
        </View>

        {/* sl 2 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Category</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          >
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.categoryPill,
                  cat.active && styles.activeCategoryPill,
                ]}
              >
                <View
                  style={[
                    styles.categoryIcon,
                    cat.active ? styles.activeCategoryIcon : null,
                  ]}
                >
                  <Ionicons
                    name={cat.icon as any}
                    size={16}
                    color={cat.active ? "#FFF" : "#1C4C46"}
                  />
                </View>
                <Text
                  style={[
                    styles.categoryText,
                    cat.active && styles.activeCategoryText,
                  ]}
                >
                  {cat.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* sl3 */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Now</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {POPULAR_PRODUCTS.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </ScrollView>
        </View>

        {/* sl4 */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Best seller</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {BEST_SELLERS.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </ScrollView>
        </View>

       
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}


const ProductCard = ({ item }: { item: any }) => (
  <View style={styles.productCard}>
    <Image source={{ uri: item.image }} style={styles.productImage} />
    <LinearGradient
      colors={["transparent", "rgba(0,0,0,0.8)"]}
      style={styles.productOverlay}
    >
      <View>
        <Text style={styles.productPrice}>{item.price}</Text>
        <Text style={styles.productName}>{item.name}</Text>
      </View>
      <TouchableOpacity style={styles.addToCartButton}>
        <Ionicons name="bag-handle" size={12} color="#1C4C46" />
      </TouchableOpacity>
    </LinearGradient>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF", 
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1C4C46",
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#1C4C46",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContent: {
    paddingBottom: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    marginHorizontal: 20,
    borderRadius: 30,
    paddingHorizontal: 16,
    height: 50,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 24,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#1E293B",
  },
  heroContainer: {
    marginBottom: 24,
  },
  heroList: {
    paddingHorizontal: 10,
  },
  heroCard: {
    width: HERO_CARD_WIDTH,
    height: 200,
    borderRadius: 24,
    overflow: "hidden",
    marginHorizontal: 10,
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 20,
  },
  shopNowButton: {
    backgroundColor: "#FFF8C9",
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
  },
  shopNowText: {
    color: "#1C4C46",
    fontWeight: "700",
    fontSize: 14,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#475569",
    marginLeft: 20,
    marginBottom: 12,
  },
  viewAllText: {
    color: "#1C4C46",
    fontWeight: "600",
    fontSize: 14,
    marginRight: 20,
  },
  categoriesList: {
    paddingHorizontal: 20,
    gap: 12,
  },
  categoryPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 30,
    marginRight: 10,
  },
  activeCategoryPill: {
    backgroundColor: "#1E293B",
  },
  categoryIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  activeCategoryIcon: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#64748B",
    paddingRight: 8,
  },
  activeCategoryText: {
    color: "#FFF",
  },
  productCard: {
    width: 160,
    height: 200,
    borderRadius: 20,
    overflow: "hidden",
    marginLeft: 20,
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
  productOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  productPrice: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },
  productName: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
  },
  addToCartButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
  },
});
