import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { Header, View } from '../../../components/index.ts';
import { useTheme } from '../../../theme/ThemeContext.tsx';
import { useNavigation } from '@react-navigation/native';
import SearchInput from '../../../components/input/SearchInput.tsx';
import UserList from '../components/UserList.tsx';
import mock from '../../../utils/mock.ts';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store.ts';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import axios from 'axios';
import { content } from '../../../utils/index.ts';
import { useWebSocket } from '../../../context/webSocketContext.ts';
import { setLoading } from '../../../reducers/utilssSlice.ts';
import WrappedView from '../../../components/WrappedView.tsx';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { chatApi } from '../../../api/index.ts';
const ChatHomeScreen: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const auth = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState<{
    loading: boolean;
    isOverlay?: boolean;
  }>({ loading: false, isOverlay: false });
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const clientRef = useRef<any>(null);
  const ws = useWebSocket();
  const [chatSummary, setChatSummary] = useState();

  useEffect(() => {
    setLoading({ loading: true, isOverlay: false });
    if (ws) {
      setLoading({ loading: false });
    }
  }, [ws]);

  const getUserChatSummary = async () => {
    let response = await chatApi.usersSummary(auth.loginToken);
    if (response.data) {
      setChatSummary(response.data);
    }
  };

  useEffect(() => {
    setLoading({ loading: true });
    getUserChatSummary().then(() => setLoading({ loading: false }));
  }, []);

  return (
    <WrappedView
      isLoading={loading.loading}
      loadingStyle={loading.isOverlay ? 'overlay' : null}>
      <View
        safe
        style={[styles.container, { backgroundColor: colors.background }]}>
        <Header
          type="single"
          title="Chats"
          onPress={() => navigation.navigate('Profile')}
          style={styles.header}
        />
        <ScrollView
          contentContainerStyle={{
            width: '100%',
            padding: 0,
          }}
          showsVerticalScrollIndicator={false}>
          <SearchInput placeholder="Type to search" />
          <UserList userList={mock.chatList} />
        </ScrollView>
      </View>
    </WrappedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    borderBottomWidth: 0.2,
  },
  balance: {
    paddingTop: 24,
    paddingBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },

  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  button: {
    marginTop: 24,
    width: Dimensions.get('window').width - 32,
  },

  content: {
    paddingBottom: 64,
  },

  card: {
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },

  title: {
    marginHorizontal: 16,
  },

  addBill: {
    borderWidth: 0.5,
    padding: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  transactions: {
    marginTop: 16,
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    gap: 16,
  },

  buttonWrapper: {
    borderRadius: 12,
    overflow: 'hidden',
  },

  toast: {
    position: 'absolute',
    zIndex: 99,
    bottom: 24,
  },
});

export default ChatHomeScreen;

//  ws.current.send(
//         JSON.stringify({
//           type: 'SEND_MESSAGE',
//           private_message: {
//             recipient: '686cd982a994b62fb531daa3',
//             content: 'whats going on',
//             ref_id: Date.now(),
//             created_at: new Date(Date.now()),
//             message_type: 'TEXT',
//           },
//         }),
//       );
