import React, { useState, useEffect, useRef } from "react";
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
  PanResponder,
  Animated,
  //   Easing,
} from "react-native";

import Pdf from "react-native-pdf";

export default function MemoriseScreen() {
  const [pdfCurrentPage, setPdfCurrentPage] = useState(621);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingPage, setEditingPage] = useState(false);
  const [inputPage, setInputPage] = useState("");
  const [isCovered, setIsCovered] = useState(false);
  const [coverTop] = useState(new Animated.Value(0)); // start at top of screen

  useEffect(() => {
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setEditingPage(false);
      //   setInputPage("");
    });

    return () => {
      hideSubscription.remove();
    };
  }, []);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      const newTop = Math.max(0, gestureState.dy); // drag down = increase top
      coverTop.setValue(newTop);
    },
  });

  //..............................................

  //   const pan = useRef(new Animated.ValueXY()).current;

  //   const panResponder = useRef(
  //     PanResponder.create({
  //       onMoveShouldSetPanResponder: () => true,
  //       onPanResponderMove: Animated.event([
  //         null,
  //         {
  //           // dx: pan.x,
  //           dy: pan.y,
  //         },
  //       ]),
  //       onPanResponderRelease: () => {
  //         pan.extractOffset();
  //       },
  //     })
  //   ).current;

  const onTickPress = () => {
    Alert.alert(
      "✅ Page Completed",
      `You marked page ${currentPage} as memorised!`
    );
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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginBottom: 10,
            zIndex: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setIsCovered(true);
            }}
          >
            <Text style={{ color: "blue" }}>🧊 Cover Page</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setIsCovered(false);
            }}
          >
            <Text style={{ color: "blue" }}>🔓 Reveal Page</Text>
          </TouchableOpacity>
        </View>
        <Pdf
          source={source}
          page={pdfCurrentPage}
          style={styles.pdf}
          horizontal={true}
          enablePaging={true}
          //   onPageChanged={() => console.log(currentPage)}
          onPageChanged={(page) => {
            setCurrentPage(622 - page);
            setIsCovered(false);
          }}
          trustAllCerts={true}
          onLoadComplete={(pages) => console.log(`Loaded ${pages} pages`)}
          // onError={(error) => console.error("PDF error:", error)}
          onError={(error) => {
            console.log("PDF failed to load:", JSON.stringify(error, null, 2));
          }}
          onLoadProgress={(percent) => console.log(`Progress: ${percent}`)}
        />
        {isCovered && (
          //   <Animated.View
          //     style={{
          //       transform: [
          //         // { translateX: pan.x },
          //         { translateY: pan.y },
          //       ],
          //     }}
          //     {...panResponder.panHandlers}
          //   >
          //     <View
          //       style={[
          //         // StyleSheet.absoluteFillObject,
          //         // ,
          //         styles.coverOverlay,
          //       ]}
          //     />
          //   </Animated.View>
          <Animated.View
            {...panResponder.panHandlers}
            style={[
              //   StyleSheet.absoluteFillObject,
              {
                backgroundColor: "#fff",
                position: "absolute",
                top: coverTop,
                left: 0,
                right: 0,
                bottom: 0, // anchored to the bottom
                width: "100%",
                alignItems: "center",
                justifyContent: "flex-start",
                borderTopWidth: 2,
                borderColor: "#ccc",
              },
            ]}
          >
            <Text style={{ fontSize: 24, padding: 10 }}>⬇️</Text>
          </Animated.View>
        )}
      </View>
      <TouchableOpacity style={styles.button} onPress={onTickPress}>
        <Text style={styles.buttonText}>✅ Memorised</Text>
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
