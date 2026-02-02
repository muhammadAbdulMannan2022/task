// @ts-nocheck
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Dimensions,
  ImageBackground,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

const { width, height } = Dimensions.get("window");

type AccountType = "player" | "coach" | null;

export default function OnboardingScreen() {
  const [selectedType, setSelectedType] = useState<AccountType>(null);
  const [scrollPos, setScrollPos] = useState(0);
  const router = useRouter();

  const handleContinue = () => {
    if (selectedType) {
      router.push({
        pathname: "/auth",
        params: { accountType: selectedType },
      });
    }
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    setScrollPos(offsetX);

    // Auto-select card based on scroll position
    const cardWidth = width - 70;
    const gap = 16;
    const totalCardWidth = cardWidth + gap;
    const currentIndex = Math.round(offsetX / totalCardWidth);

    if (currentIndex === 0) {
      setSelectedType("player");
    } else if (currentIndex === 1) {
      setSelectedType("coach");
    }
  };

  const getCardScale = (cardIndex: number): number => {
    const cardWidth = width - 70;
    const screenCenter = width / 2;
    const cardCenter = cardIndex * cardWidth + cardWidth / 2 + 20; // 20 is paddingHorizontal
    const distanceFromCenter = Math.abs(scrollPos + screenCenter - cardCenter);
    const normalizedDistance = distanceFromCenter / cardWidth;

    // Active card (centered) = 1, other cards = 0.8
    if (normalizedDistance < 0.5) {
      return 1;
    }
    return 0.8;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Choose Account Type</Text>
        <Text style={styles.subtitle}>
          Are you the player in action or the coach in charge?
        </Text>
      </View>

      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        onScroll={handleScroll}
      >
        {/* Player Card */}
        <View style={{ transform: [{ scale: getCardScale(0) }] }}>
          <TouchableOpacity
            style={[
              styles.card,
              selectedType === "player" && styles.cardSelected,
            ]}
            onPress={() => setSelectedType("player")}
            activeOpacity={0.9}
          >
            <ImageBackground
              source={require("../assets/str/player.jpg")}
              style={styles.imageBackground}
              imageStyle={styles.backgroundImage}
            >
              <LinearGradient
                colors={[
                  "transparent",
                  "transparent",
                  "transparent",
                  "transparent",
                  "rgba(0, 0, 0)",
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.overlay}
              />
              <View style={styles.textOverlay}>
                <Text style={styles.cardTitle}>Player</Text>
                <Text style={styles.cardDescription}>
                  Sharpen your skills, track your progress,{"\n"}and rise
                  through the ranks
                </Text>
              </View>
            </ImageBackground>

            {selectedType === "player" && <View style={styles.checkmark} />}
          </TouchableOpacity>
        </View>

        {/* Coach Card */}
        <View style={{ transform: [{ scale: getCardScale(1) }] }}>
          <TouchableOpacity
            style={[
              styles.card,
              selectedType === "coach" && styles.cardSelected,
            ]}
            onPress={() => setSelectedType("coach")}
            activeOpacity={0.9}
          >
            <ImageBackground
              source={require("../assets/str/coach.png")}
              style={styles.imageBackground}
              imageStyle={styles.backgroundImage}
            >
              <LinearGradient
                colors={["rgba(0, 0, 0, 0.5)", "transparent"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.overlay}
              />
              <View style={styles.textOverlay}>
                <Text style={styles.cardTitle}>Coach</Text>
                <Text style={styles.cardDescription}>
                  Show your game, build your legacy,{"\n"}and lead the next
                  generation of{"\n"}champions
                </Text>
              </View>
            </ImageBackground>

            {selectedType === "coach" && <View style={styles.checkmark} />}
          </TouchableOpacity>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={[
          styles.continueButton,
          !selectedType && styles.continueButtonDisabled,
        ]}
        onPress={handleContinue}
        disabled={!selectedType}
      >
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingTop: 60,
  },
  header: {
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    fontWeight: "400",
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    gap: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 0,
    width: width - 70,
    height: width - 50,
    marginRight: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  cardSelected: {
    borderWidth: 3,
    borderColor: "#1B5E5D",
  },
  imageBackground: {
    width: "100%",
    height: 380,
    justifyContent: "flex-end",
  },
  backgroundImage: {
    resizeMode: "cover",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  textOverlay: {
    padding: 24,
    paddingBottom: 28,
  },
  cardTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: "#fff",
    lineHeight: 20,
    fontWeight: "400",
  },
  checkmark: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#1B5E5D",
    justifyContent: "center",
    alignItems: "center",
  },
  continueButton: {
    backgroundColor: "#1B5E5D",
    borderRadius: 50,
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    marginTop: 24,
    marginBottom: 40,
  },
  continueButtonDisabled: {
    opacity: 0.5,
  },
  continueText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
