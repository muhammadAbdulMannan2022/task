// @ts-nocheck
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Mock Data
const RECENT_NOTIFICATIONS = [
  {
    id: "1",
    text: "Coach Elias tagged you in your drill feedback. See what you did great!",
    time: "5 hours ago",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
  },
  {
    id: "2",
    text: "Your fitness goal update is now available — review your weekly progress.",
    time: "5 hours ago",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200&q=80",
  },
];

const READ_NOTIFICATIONS = [
  {
    id: "3",
    text: "You've been subscribed to Advanced Strength Plan starts tomorrow!",
    time: "5 hours ago",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
  },
  {
    id: "4",
    text: "Our subscription to Core Stability Series has been renewed.",
    time: "5 hours ago",
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade8f55?w=200&q=80",
  },
  {
    id: "5",
    text: "Your payment of $49 for Speed Boost Plan was successful.",
    time: "5 hours ago",
    image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=200&q=80",
  },
  {
    id: "6",
    text: "You missed watching Explosive Footwork Drill from yesterday. Catch up now to stay on track!",
    time: "5 hours ago",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=200&q=80",
  },
  {
    id: "7",
    text: "Our follower Liam just uploaded a new training video check it out and get inspired!",
    time: "5 hours ago",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
  },
];

const FILTERS = ["All", "Subscription", "Ecommerce"];

export default function NotificationsScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <View style={styles.container}>
     
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={{ width: 44 }} /> 
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        
        <View style={styles.filterSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {FILTERS.map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterChip,
                  
                  filter === "All" && styles.allFilterChip,
                ]}
                onPress={() => setActiveFilter(filter)}
              >
                {filter === "All" && (
                   <Ionicons name="infinite" size={16} color="#64748B" style={{marginRight: 6}} />
                )}
                {filter === "Subscription" && (
                   <Ionicons name="checkmark" size={16} color="#64748B" style={{marginRight: 6}} />
                )}
                 {filter === "Ecommerce" && (
                   <Ionicons name="bag-outline" size={16} color="#64748B" style={{marginRight: 6}} />
                )}
                <Text style={styles.filterText}>{filter}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        
        <Text style={styles.sectionTitle}>Recent</Text>
        <View style={styles.recentContainer}>
          {RECENT_NOTIFICATIONS.map((item) => (
            <NotificationItem key={item.id} item={item} />
          ))}
        </View>

       
        <Text style={styles.sectionTitle}>Read</Text>
        <View style={styles.readContainer}>
          {READ_NOTIFICATIONS.map((item) => (
            <NotificationItem key={item.id} item={item} />
          ))}
        </View>
        
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const NotificationItem = ({ item }: { item: any }) => (
  <View style={styles.notificationItem}>
    <Image source={{ uri: item.image }} style={styles.avatar} />
    <View style={styles.notificationContent}>
      <Text style={styles.notificationText}>
        
         {item.text}
      </Text>
      <Text style={styles.timeText}>{item.time}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFDFD", // Warm White
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#1C4C46",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1E293B",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  filterSection: {
    marginBottom: 24,
    flexDirection: 'row',
  },
  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
  },
  allFilterChip: {
    // specific style if needed, e.g. wider
  },
  filterText: {
    fontSize: 14,
    color: "#475569",
    fontWeight: "500",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#475569",
    marginBottom: 12,
  },
  recentContainer: {
    backgroundColor: "#F1F5F9",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  readContainer: {
    // simple list, no background
  },
  notificationItem: {
    flexDirection: "row",
    marginBottom: 16,
    alignItems: 'flex-start'
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 12,
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
    paddingTop: 4,
  },
  notificationText: {
    fontSize: 14,
    color: "#475569",
    lineHeight: 20,
    marginBottom: 4,
  },
  timeText: {
    fontSize: 12,
    color: "#94A3B8",
  },
});
