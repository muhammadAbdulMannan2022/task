// BlurView removed due to Android crash issues
import { Ionicons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const TabIcon = ({ name, focused }: { name: string; focused: boolean }) => {
  const color = "#FFF"
  let iconName: any = "home";

  if (name === "index") {
    iconName = focused ? "home" : "home-outline";
  } else if (name === "explore") {
    iconName = focused ? "compass" : "compass-outline";
  } else if (name === "shop") {
    iconName = focused ? "bag" : "bag-outline";
  } else if (name === "profile") {
    iconName = focused ? "person" : "person-outline";
  }

  return <Ionicons name={iconName} size={focused?24:28} color={color} />;
};

const getTabLabel = (routeName: string) => {
  const labels: { [key: string]: string } = {
    index: "Home",
    explore: "Explore",
    shop: "Shop",
    profile: "Profile",
  };
  return labels[routeName] || routeName;
};

const CustomTabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.glassContainer}>
        {/* Glassmorphism overlay */}
        <View style={styles.glassOverlay} />
        
        <View style={styles.tabBar}>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            // Active tab shows like a pill button with label
            if (isFocused) {
              return (
                <TouchableOpacity
                  key={route.key}
                  style={styles.activeTab}
                  onPress={onPress}
                  activeOpacity={0.8}
                >
                  <TabIcon name={route.name} focused={true} />
                  <Text style={styles.activeTabText} numberOfLines={1}>
                    {getTabLabel(route.name)}
                  </Text>
                </TouchableOpacity>
              );
            }

            // Inactive tabs show just the icon
            return (
              <TouchableOpacity
                key={route.key}
                style={styles.tab}
                onPress={onPress}
                activeOpacity={0.7}
              >
                <TabIcon name={route.name} focused={false} />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 40,
    left: 20,
    right: 20,
    alignItems: "center",
  },
  glassContainer: {
    borderRadius: 40,
    overflow: "hidden",
    width: "100%",
    // Glassmorphism base
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    // Shadow for depth
    shadowColor: "#797979ff",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  glassOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Platform.OS === "android" 
      ? "rgba(100, 100, 100, 0.2)"
      : "rgba(30, 30, 30, 0.2)",
  },
  tabBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingVertical: 10,
    paddingHorizontal: 10,
    height: 75,
  },
  tab: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: "100%",
  },
  activeTab: {
    backgroundColor: "#1C4C46",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 30,
    gap: 8,
    height: 54,
    // Active tab shadow
    shadowColor: "#1C4C46",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  activeTabText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
});

export default CustomTabBar;
