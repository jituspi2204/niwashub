import React from 'react';

import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../../../theme/ThemeContext.tsx';
import { useNavigation } from '@react-navigation/native';
import { Text, View } from '../../../components';
import { images } from '../../../utils';

interface ServiceProps {
  style?: ViewStyle;
}

const services = [
  {
    icon: images.community,
    title: 'Members',
    link: 'Members',
    subtitle: 'Add and manage visitors',
  },
  {
    icon: images.visitor,
    title: 'Visitors',
    link: 'Visitors',
    subtitle: 'Add and manage visitors',
  },
  {
    icon: images.payment,
    title: 'Maintenance',
    link: 'Maintenance',
    subtitle: 'Add and manage visitors',
  },
  {
    icon: images.parking,
    title: 'Parking',
    link: 'Complaints',
    subtitle: 'Manage your parking area efficently ',
  },
  {
    icon: images.complaint,
    title: 'Complaints',
    link: 'Complaints',
    subtitle: 'Add, track and manage your complaints',
  },
];

const Services: React.FC<ServiceProps> = ({ style }) => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  return (
    <FlatList
      horizontal
      contentContainerStyle={styles.container}
      data={services || []}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={[styles.serviceCard, { backgroundColor: '#fff' }]}
          onPress={() => navigation.navigate(item.link, {})}>
          <View style={{ width: '60%', padding: 16 }}>
            <Text h6 n700>
              {item.title}
            </Text>
            <Text base2Medium n600>
              {item.subtitle}
            </Text>
          </View>
          <Image
            source={item.icon}
            height={60}
            width={60}
            style={styles.icon}
          />
        </TouchableOpacity>
      )}
    />
  );
};

export default Services;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 16,
    width: '100%',
  },
  icon: {
    width: 120,
    height: 100,
    borderRadius: 5,
  },
  serviceCard: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 8,
    elevation: 3,
    backgroundColor: '#fdfdfd',
  },
});
