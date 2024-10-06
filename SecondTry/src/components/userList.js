import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <View>
      <Text>User List:</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.user_id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.username}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default UserList;
