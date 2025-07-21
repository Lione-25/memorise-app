import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  Keyboard,
} from "react-native";

import Pdf from "react-native-pdf";

export default function MemoriseScreen() {
  const [pdfCurrentPage, setPdfCurrentPage] = useState(621);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingPage, setEditingPage] = useState(false);
  const [inputPage, setInputPage] = useState("");

  useEffect(() => {
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setEditingPage(false);
      //   setInputPage("");
    });

    return () => {
      hideSubscription.remove();
    };
  }, []);

  const onTickPress = () => {
    Alert.alert("✅ Page Completed", `You marked page ${currentPage} as done!`);
    // Optional: Save to AsyncStorage or backend
  };

  //   const source = require("../assets/almadinah-qadim.pdf");
  const source = { uri: "bundle-assets://almadinah-qadim(1).pdf" };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <View>
          {editingPage ? (
            <TextInput
              style={styles.pageInput}
              value={inputPage}
              onChangeText={setInputPage}
              autoFocus
              keyboardType="numeric"
              onSubmitEditing={() => {
                const num = parseInt(inputPage);
                if (!isNaN(num) && num >= 1 && num <= 604) {
                  setPdfCurrentPage(622 - num);
                }
                setEditingPage(false);
                setInputPage("");
              }}
              onBlur={() => {
                setEditingPage(false);
                setInputPage("");
              }}
            />
          ) : (
            <TouchableOpacity onPress={() => setEditingPage(true)}>
              <Text style={styles.pageNumber}>
                Page {currentPage > 0 ? currentPage : "--"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
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
  pageInput: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    borderBottomWidth: 1,
    borderColor: "#999",
    marginTop: 10,
    padding: 2,
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
