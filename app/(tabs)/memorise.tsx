import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context"; // If not already installed, run: expo install react-native-safe-area-context
// import {
//   GestureHandlerRootView,
//   GestureDetector,
//   Gesture,
// } from "react-native-gesture-handler";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";

import Pdf from "react-native-pdf";

export default function MemoriseScreen() {
  const [pdfCurrentPage, setPdfCurrentPage] = useState(621); // ← Change this to the page number you want (1-indexed)
  const [currentPage, setCurrentPage] = useState(1);

  const onTickPress = () => {
    Alert.alert("✅ Page Completed", `You marked page ${currentPage} as done!`);
    // Optional: Save to AsyncStorage or backend
  };

  //   const source = require("../assets/almadinah-qadim.pdf");
  const source = { uri: "bundle-assets://almadinah-qadim(1).pdf" };
  //   const source = { uri: "bundle-assets://trial.pdf" };

  //   const [page, setPage] = useState(1);
  //   const totalPages = 604; // or get from onLoadComplete

  //   const panGesture = Gesture.Pan().onEnd((e) => {
  //     const swipeDistance = e.translationX;

  //     if (swipeDistance > 50) {
  //       // Swiped right → in Arabic, that's "next"
  //       setPage((prev) => Math.max(prev - 1, 1));
  //     } else if (swipeDistance < -50) {
  //       // Swiped left → in Arabic, that's "previous"
  //       setPage((prev) => Math.min(prev + 1, totalPages));
  //     }
  //   });

  return (
    <SafeAreaView style={styles.container}>
      {/* <GestureHandlerRootView>
        <GestureDetector gesture={panGesture}> */}
      <View style={{ flex: 1 }}>
        <Text style={styles.pageNumber}>
          Page {currentPage > 0 ? currentPage : "--"}
        </Text>
        {/* <View style={styles.pdfWrapper}> */}
        <Pdf
          source={source}
          page={pdfCurrentPage}
          style={styles.pdf}
          horizontal={true}
          // scrollEnabled={false} // disable built-in swiping
          //   enableRTL={true} // This flips the swipe direction for Arabic-style reading
          enablePaging={true}
          //   onPageChanged={() => console.log(currentPage)}
          onPageChanged={(page) => setCurrentPage(622 - page)}
          trustAllCerts={true}
          onLoadComplete={(pages) => console.log(`Loaded ${pages} pages`)}
          // onError={(error) => console.error("PDF error:", error)}
          onError={(error) => {
            console.log("PDF failed to load:", JSON.stringify(error, null, 2));
          }}
          onLoadProgress={(percent) => console.log(`Progress: ${percent}`)}
        />
      </View>
      {/* </View> */}
      {/* </GestureDetector>
      </GestureHandlerRootView> */}
      <TouchableOpacity style={styles.button} onPress={onTickPress}>
        <Text style={styles.buttonText}>✅ Completed</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  pageNumber: {
    textAlign: "center",
    fontSize: 16,
    // marginTop: 10,
    marginBottom: 10,
    fontWeight: "bold",
  },
  //   pdfWrapper: {
  //     flex: 1,
  //     // transform: [{ scaleX: -1 }], // Flip outer container
  //   },
  pdf: {
    flex: 1,
    // transform: [{ scaleX: -1 }], // Flip it back so PDF looks normal
    width: Dimensions.get("window").width,
  },
  button: {
    backgroundColor: "green",
    paddingVertical: 14,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
