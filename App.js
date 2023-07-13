import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ToastAndroid,
  KeyboardAvoidingView,
} from "react-native";

export default function MyApp() {
  const [employeeID, setEmployeeID] = useState("");
  const [fetchedName, setFetchedName] = useState("");
  const [name, setName] = useState("");
  const [employeeSalary, setEmployeeSalary] = useState("");
  const [age, setAge] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [methodToShow, setMethodToShow] = useState(null);

  const fetchEmployee = () => {
    fetch(`https://dummy.restapiexample.com/api/v1/employee/${employeeID}`)
      .then((response) => response.json())
      .then((json) => {
        console.log("Response:", json);
        setFetchedName(json.data.employee_name);
      })
      .catch((error) => {
        console.error(error);
        ToastAndroid.show("An error occurred", ToastAndroid.SHORT);
      });
  };

  const addEmployee = () => {
    fetch("https://dummy.restapiexample.com/api/v1/create", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        employee_salary: employeeSalary,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.id) {
          ToastAndroid.show(
            "Created object at id: " + json.id,
            ToastAndroid.SHORT
          );
        } else {
          ToastAndroid.show("Failed to create object", ToastAndroid.SHORT);
        }
      })
      .catch((error) => {
        console.error(error);
        ToastAndroid.show("An error occurred", ToastAndroid.SHORT);
      });
  };

  const updateEmployee = () => {
    fetch(`https://dummy.restapiexample.com/api/v1/update/${employeeID}`, {
      method: "PUT",
      body: JSON.stringify({
        name: name,
        employee_salary: employeeSalary,
        age: age,
        profile_image: "",
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.updatedAt) {
          ToastAndroid.show("Updated object", ToastAndroid.SHORT);
        } else {
          ToastAndroid.show("Failed to update object", ToastAndroid.SHORT);
        }
      })
      .catch((error) => {
        console.error(error);
        ToastAndroid.show("An error occurred", ToastAndroid.SHORT);
      });
  };

  const deleteEmployee = () => {
    fetch(`https://dummy.restapiexample.com/api/v1/delete/${employeeID}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.success) {
          ToastAndroid.show("Deleted object", ToastAndroid.SHORT);
        } else {
          ToastAndroid.show("Failed to delete object", ToastAndroid.SHORT);
        }
      })
      .catch((error) => {
        console.error(error);
        ToastAndroid.show("An error occurred", ToastAndroid.SHORT);
      });
  };

  return (
    <View style={styles.container}>
      {methodToShow === null && <Text style={styles.header}>API</Text>}
      {methodToShow === "GET" && (
        <View style={styles.methodContainer}>
          <Text style={styles.header}>GET method!</Text>
          <TextInput
            placeholder="ID"
            style={styles.input}
            value={employeeID.toString()}
            onChangeText={(text) => setEmployeeID(parseInt(text))}
          />
          <Button
            title="Fetch"
            style={styles.button}
            onPress={fetchEmployee}
            color="black"
          />
          <Text>Name: {fetchedName}</Text>
        </View>
      )}
      {methodToShow === "POST" && (
        <View style={styles.methodContainer}>
          <Text style={styles.header}>POST method!</Text>
          <TextInput
            placeholder="Name"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            placeholder="Employee Salary"
            style={styles.input}
            value={employeeSalary}
            onChangeText={setEmployeeSalary}
          />
          <TextInput
            placeholder="Age"
            style={styles.input}
            value={age}
            onChangeText={setAge}
          />
          <TextInput
            placeholder="Profile Image"
            style={styles.input}
            value={profileImage}
            onChangeText={setProfileImage}
          />
          <Button
            title="Post"
            style={styles.button}
            onPress={addEmployee}
            color="black"
          />
        </View>
      )}

      {methodToShow === "PUT" && (
        <View style={styles.methodContainer}>
          <Text style={styles.header}>PUT method!</Text>
          <TextInput
            placeholder="Id"
            style={styles.input}
            value={employeeID.toString()}
            onChangeText={(text) => setEmployeeID(parseInt(text))}
          />
          <TextInput
            placeholder="Name"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            placeholder="Employee Salary"
            style={styles.input}
            value={employeeSalary}
            onChangeText={setEmployeeSalary}
          />
          <Button
            title="Post"
            style={styles.button}
            onPress={updateEmployee}
            color="black"
          />
        </View>
      )}
      {methodToShow === "DELETE" && (
        <View style={styles.methodContainer}>
          <Text style={styles.header}>DELETE method!</Text>
          <TextInput
            placeholder="Id"
            style={styles.input}
            value={employeeID.toString()}
            onChangeText={(text) => setEmployeeID(parseInt(text))}
          />
          <Button
            title="Post"
            style={styles.button}
            onPress={deleteEmployee}
            color="black"
          />
        </View>
      )}
      <View style={styles.optionsButton}>
        <Button
          title="GET"
          style={[styles.button, styles.optionsButton]}
          onPress={() => setMethodToShow("GET")}
          color="black"
        />

        <Button
          title="POST"
          style={[styles.button, styles.optionsButton]}
          onPress={() => setMethodToShow("POST")}
          color="black"
        />

        <Button
          title="PUT"
          style={[styles.button, styles.optionsButton]}
          onPress={() => setMethodToShow("PUT")}
          color="black"
        />

        <Button
          title="DELETE"
          style={[styles.button, styles.optionsButton]}
          onPress={() => setMethodToShow("DELETE")}
          color="black"
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#FF5733",
    fontFamily: "Arial",
  },
  container: {
    flex: 1,
    backgroundColor: "beige",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  button: {
    height: 40,
    paddingHorizontal: 10,
    padding: 20,
    borderRadius: 20,
    marginBottom: 10,
    fontFamily: "Arial",
  },
  input: {
    borderWidth: 2,
    width: 300,
    margin: 10,
    borderStyle: "solid",
    borderColor: "black",
    fontSize: 20,
    padding: 10,
    fontFamily: "Arial",
  },

  optionsButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 60,
    padding: 20,
  },
  methodContainer: {
    position: "absolute",
    top: 80,
    padding: 20,
  },
});
