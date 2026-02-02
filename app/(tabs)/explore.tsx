import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
const CARD_GAP = 16;
const CARD_WIDTH = (width - 40 - CARD_GAP) / 2;


const FILTERS = [
  { id: "1", label: "Sports", image: "https://images.unsplash.com/photo-1579952363873-27f3bade8f55?w=200&q=80" },
  { id: "2", label: "Gender", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80" },
  { id: "3", label: "Position", image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=200&q=80" },
  { id: "4", label: "Level", image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=200&q=80" },
];

const COACHES = [
  {
    id: "1",
    name: "Esther Howard",
    role: "Chiefs Pro",
    image: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=500&q=80",
  },
  {
    id: "2",
    name: "Kathryn Murphy",
    role: "WR Texas College",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&q=80",
  },
  {
    id: "3",
    name: "Cody Fisher",
    role: "RD Dallas Pro",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&q=80",
  },
  {
    id: "4",
    name: "Arlene McCoy",
    role: "College",
    image: "https://images.unsplash.com/photo-1554151228-14d9def656ec?w=500&q=80",
  },
  {
    id: "5",
    name: "Dianne Russell",
    role: "San Francisco Stars",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=80",
  },
  {
    id: "6",
    name: "Floyd Miles",
    role: "Sons of Anarchy",
    image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=500&q=80",
  },
];

import { useRouter } from "expo-router";

export default function ExploreScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
     
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore</Text>
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
      
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#94A3B8" />
          <TextInput
            placeholder="Search by name, sports etc"
            placeholderTextColor="#94A3B8"
            style={styles.searchInput}
          />
          <TouchableOpacity style={styles.filterIcon}>
            <Ionicons name="options-outline" size={20} color="#64748B" />
          </TouchableOpacity>
        </View>

       
        <View style={styles.filterSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
            {FILTERS.map((filter) => (
              <TouchableOpacity key={filter.id} style={styles.filterChip}>
                <Image source={{ uri: filter.image }} style={styles.filterImage} />
                <Text style={styles.filterText}>{filter.label}</Text>
                <Ionicons name="chevron-down" size={14} color="#64748B" />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Popular Coaches Grid */}
        <View style={styles.coachesSection}>
          <Text style={styles.sectionTitle}>Popular Coaches</Text>
          <View style={styles.grid}>
            {COACHES.map((coach) => (
              <TouchableOpacity key={coach.id} style={styles.coachCard}>
                <Image source={{ uri: coach.image }} style={styles.coachImage} />
                <LinearGradient
                  colors={["transparent", "rgba(0,0,0,0.8)"]}
                  style={styles.coachOverlay}
                >
                  <Text style={styles.coachName}>{coach.name}</Text>
                  <Text style={styles.coachRole}>{coach.role}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>

       
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

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
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: "#1E293B",
  },
  filterIcon: {
    padding: 4,
  },
  filterSection: {
    marginBottom: 24,
  },
  filterScroll: {
    paddingLeft: 20,
  },
  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderRadius: 20,
    marginRight: 10,
    paddingRight: 12,
  },
  filterImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  filterText: {
    fontSize: 14,
    color: "#475569",
    fontWeight: "500",
    marginRight: 6,
  },
  coachesSection: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#475569",
    marginBottom: 16,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: CARD_GAP,
  },
  coachCard: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * 1.3, // Aspect ratio approx 3:4
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#E2E8F0",
  },
  coachImage: {
    width: "100%",
    height: "100%",
  },
  coachOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    paddingBottom: 16,
  },
  coachName: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  coachRole: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
    fontWeight: "500",
  },
});
