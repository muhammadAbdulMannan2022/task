import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "@react-native-community/blur";
import React, { useState } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();
  const [chartPeriod, setChartPeriod] = useState<"month" | "year">("month");

  // Custom Chart Data - Month View
  const monthlyData = [40, 60, 80, 90, 70, 100, 95, 85, 75, 60, 70, 90, 80, 95, 100, 90, 85];
  // Custom Chart Data - Year View
  const yearlyData = [65, 75, 85, 80, 90, 100, 95, 110, 85, 70, 75, 80];

  const currentData = chartPeriod === "month" ? monthlyData : yearlyData;
  const activeIndex = chartPeriod === "month" ? 5 : 7; // Highlight 6th bar in month, 8th in year

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard</Text>
        <TouchableOpacity 
          style={styles.notificationButton}
          onPress={() => router.push("/notifications")}
        >
          <Ionicons name="notifications-outline" size={24} color="#245550" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Greeting */}
        <Text style={styles.greeting}>Good evening, Jerome! 👋</Text>

        {/* Total Earnings Card with Blur */}
        <View style={styles.earningsCardContainer}>
          <View style={[styles.earningsCard, { backgroundColor: "#1C4C46" }]}>
            <View style={styles.earningsOverlay}>
              <View style={styles.earningsHeader}>
                <Text style={styles.earningsLabel}>Total earnings</Text>
                <View style={styles.percentageBadge}>
                  <Text style={styles.percentageText}>56%</Text>
                  <Ionicons name="trending-up" size={12} color="#22C55E" />
                </View>
              </View>

              <View style={styles.earningsAmountRow}>
                <View>
                  <Text style={styles.earningsAmount}>7,204</Text>
                  <Text style={styles.earningsCurrency}>USD</Text>
                </View>
                <TouchableOpacity style={styles.withdrawButton}>
                  <Text style={styles.withdrawText}>Withdraw now</Text>
                  <View style={styles.withdrawArrowContainer}>
                    <Ionicons name="arrow-forward" size={16} color="#FFF" />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          {/* Total Views */}
          <View style={[styles.statCard, { backgroundColor: "#FFF8C9" }]}>
            <View style={styles.statHeader}>
              <Text style={styles.statLabel}>Total views</Text>
              <View style={styles.statBadge}>
                <Text style={styles.statBadgeText}>28%</Text>
                <Ionicons name="trending-up" size={10} color="#22C55E" />
              </View>
            </View>
            <Text style={styles.statValue}>1,678</Text>
            <Text style={styles.statUnit}>Views</Text>
          </View>

          {/* New Subscribers */}
          <View style={[styles.statCard, { backgroundColor: "#FFF8C9" }]}>
            <View style={styles.statHeader}>
              <Text style={styles.statLabel}>New subscriber</Text>
              <View style={styles.statBadge}>
                <Text style={styles.statBadgeText}>7%</Text>
                <Ionicons name="trending-down" size={10} color="#EF4444" />
              </View>
            </View>
            <Text style={styles.statValue}>17</Text>
            <Text style={styles.statUnit}>People</Text>
          </View>
        </View>

        {/* Total Engagement Chart */}
        <View style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>Total engagement</Text>
            <TouchableOpacity 
              style={styles.monthSelector}
              onPress={() => setChartPeriod(chartPeriod === "month" ? "year" : "month")}
            >
              <Text style={styles.monthText}>
                {chartPeriod === "month" ? "This month" : "This year"}
              </Text>
              <Ionicons name="chevron-down" size={16} color="#64748B" />
            </TouchableOpacity>
          </View>

          {/* Chart Wrapper with Y-Axis */}
          <View style={{ flexDirection: 'row', height: 180 }}>
            {/* Y-Axis Labels */}
            <View style={{ justifyContent: 'space-between', paddingBottom: 20, paddingRight: 8 }}>
              <Text style={styles.yAxisLabel}>80%</Text>
              <Text style={styles.yAxisLabel}>60%</Text>
              <Text style={styles.yAxisLabel}>40%</Text>
              <Text style={styles.yAxisLabel}>20%</Text>
            </View>

            {/* Chart Bars */}
            <View style={{ flex: 1 }}>
              <View style={styles.simpleChart}>
                {currentData.map((value, index) => (
                  <View key={index} style={styles.barContainer}>
                    <View
                      style={[
                        styles.bar,
                        {
                          height: `${(value / 120) * 100}%`,
                          backgroundColor: index === activeIndex ? "#1C4C46" : "#A5D6A7",
                          borderRadius: 4,
                        },
                      ]}
                    />
                  </View>
                ))}
              </View>

              <View style={styles.chartLabels}>
                {chartPeriod === "month" ? (
                  <>
                    <Text style={styles.chartLabel}>Jul 1</Text>
                    <Text style={styles.chartLabel}>Jul 8</Text>
                    <Text style={styles.chartLabel}>Jul 15</Text>
                    <Text style={styles.chartLabel}>Jul 22</Text>
                    <Text style={styles.chartLabel}>Jul 29</Text>
                  </>
                ) : (
                  <>
                    <Text style={styles.chartLabel}>Jan</Text>
                    <Text style={styles.chartLabel}>Apr</Text>
                    <Text style={styles.chartLabel}>Aug</Text>
                    <Text style={styles.chartLabel}>Dec</Text>
                  </>
                )}
              </View>
            </View>
          </View>
        </View>

        {/* Play Video Section */}
        <View style={styles.videoSection}>
          <Text style={styles.videoTitle}>Play Video</Text>

          <View style={styles.videoCard}>
            <Image
              source={require("@/assets/ronaldo.jpg")}
              style={styles.videoThumbnail}
            />

            {/* Floating Glass Card */}
            <View style={styles.videoBlurContainer}>
              <BlurView
                style={StyleSheet.absoluteFill}
                blurType="light"
                blurAmount={15}
                reducedTransparencyFallbackColor="rgba(30,30,30,0.85)"
              />
              <View style={styles.videoInfo}>
                <Text style={styles.videoDate}>Scheduled post on</Text>
                <Text style={styles.videoDescription}>
                  Turkish attacker steals the spotlight at the Club World Cup
                  ⚽🔥 , emerging as the tournament's top...
                </Text>
                <View style={styles.videoMeta}>
                  <View>
                    <Text style={styles.videoMetaLabel}>Scheduled post on</Text>
                    <Text style={styles.videoMetaValue}>Monday</Text>
                  </View>
                  <View>
                    <Text style={styles.videoMetaLabel}>Approve status</Text>
                    <Text style={styles.videoMetaValue}>Pending</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Bottom Spacing for Tab Bar */}
        <View style={{ height: 120 }} />
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
    backgroundColor: "#FFFFFF",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1E293B",
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#E0F2F1",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  greeting: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 16,
  },
  earningsCardContainer: {
    marginBottom: 16,
    borderRadius: 20,
    overflow: "hidden",
  },
  earningsCard: {
    borderRadius: 20,
  },
  earningsOverlay: {
    backgroundColor: Platform.OS === "android" ? "#245550" : "rgba(36, 85, 80, 0.9)",
    padding: 20,
  },
  earningsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  earningsLabel: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    fontWeight: "500",
  },
  percentageBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  percentageText: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  earningsAmountRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  earningsAmount: {
    fontSize: 40,
    fontWeight: "700",
    color: "#FFFFFF",
    lineHeight: 44,
  },
  earningsCurrency: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    marginTop: 4,
  },
  withdrawButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF8C9", // Cream color
    paddingLeft: 16,
    paddingRight: 6,
    paddingVertical: 6,
    borderRadius: 30,
    gap: 12,
  },
  withdrawText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#1C4C46",
  },
  withdrawArrowContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#1C4C46",
    alignItems: "center",
    justifyContent: "center",
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
  },
  statHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  statLabel: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "500",
    flex: 1,
  },
  statBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  statBadgeText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#64748B",
  },
  statValue: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 4,
  },
  statUnit: {
    fontSize: 12,
    color: "#94A3B8",
  },
  chartCard: {
    backgroundColor: "#FFF8C9",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  chartHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E293B",
  },
  monthSelector: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  monthText: {
    fontSize: 13,
    color: "#64748B",
    fontWeight: "500",
  },
  simpleChart: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: 160,
    gap: 4,
    marginBottom: 8,
  },
  barContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  bar: {
    width: "100%",
    borderRadius: 4,
  },
  chartLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 4,
  },
  chartLabel: {
    fontSize: 10,
    color: "#94A3B8",
  },
  yAxisLabel: {
    fontSize: 10,
    color: "#94A3B8",
    textAlign: "right",
  },
  videoSection: {
    marginBottom: 16,
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 12,
  },
  videoCard: {
    borderRadius: 24,
    overflow: "hidden",
    height: 320,
    backgroundColor: "#000",
  },
  videoThumbnail: {
    width: "100%",
    height: "100%",
  },
  videoBlurContainer: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "rgba(0,0,0,0.15)", // Subtle dark tint
  },
  videoInfo: {
    padding: 16,
    gap: 8,
  },
  videoDate: {
    fontSize: 12,
    color: "rgba(255,255,255,0.7)",
  },
  videoDescription: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    lineHeight: 22,
  },
  videoMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  videoMetaLabel: {
    fontSize: 11,
    color: "rgba(255,255,255,0.6)",
    marginBottom: 4,
  },
  videoMetaValue: {
    fontSize: 13,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
