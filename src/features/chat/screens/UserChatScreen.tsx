import React, { useEffect, useRef } from 'react';
import {
  Dimensions,
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { Header, View } from '../../../components/index.ts';
import { useTheme } from '../../../theme/ThemeContext.tsx';
import { useNavigation, useRoute } from '@react-navigation/native';
import SearchInput from '../../../components/input/SearchInput.tsx';
import UserList from '../components/UserList.tsx';
import mock from '../../../utils/mock.ts';
import UserChatHeader from '../components/UserChatHeader.tsx';
import SentMessage from '../components/SentMessage.tsx';
import ReceivedMessage from '../components/ReceivedMessage.tsx';
import SendMessageInput from '../components/SendMessageInput.tsx';

const UserChatScreen: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const route = useRoute();
  const flatListRef = useRef<FlatList>(null);
  useEffect(() => {
    flatListRef.current.scrollToEnd({ animated: true });
  }, []);
  let userName = route?.params?.userName;
  let userId = route?.params?.userId;
  return (
    <View
      safe
      style={[styles.container, { backgroundColor: colors.background }]}>
      <UserChatHeader title={userName} />
      <View
        style={{
          flex: 1,
        }}>
        <FlatList
          ref={flatListRef}
          contentContainerStyle={{
            flexDirection: 'column',
            justifyContent: 'flex-start',
          }}
          data={mock.messages}
          keyExtractor={val => val.id}
          renderItem={({ item }) => {
            let message = item;
            if (message.sender == userId) {
              return (
                <SentMessage
                  content={message.content}
                  timestamp={message.timestamp}
                  status={message.status}
                />
              );
            } else {
              return (
                <ReceivedMessage
                  content={message.content}
                  timestamp={message.timestamp}
                  status={message.status}
                />
              );
            }
          }}
        />
      </View>
      <SendMessageInput />
    </View>
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

export default UserChatScreen;
