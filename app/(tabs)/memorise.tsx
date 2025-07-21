import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.pageNumber}>
          Page {currentPage > 0 ? currentPage : "--"}
        </Text>
        <Pdf
          source={source}
          page={pdfCurrentPage}
          style={styles.pdf}
          horizontal={true}
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
    marginBottom: 10,
    fontWeight: "bold",
  },
  pdf: {
    flex: 1,
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
