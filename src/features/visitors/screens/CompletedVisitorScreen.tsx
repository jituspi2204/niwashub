import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { View } from '../../../components';
import { useTheme } from '../../../theme/ThemeContext.tsx';
import VisitorCard from '../components/VisitorCard.tsx';

const CompletedVisitorScreen: React.FC = ({ route }) => {
  const { colors } = useTheme();
  const [upcomingVisitor, setUpcomingVisitor] = useState<any>([]);
  const visitors = route.params.visitors;
  useEffect(() => {
    let newVisitors = visitors.filter(
      (visitor: any) => visitor.status === 'completed',
    );
    setUpcomingVisitor(newVisitors);
  }, [visitors]);
  return (
    <View
      safe
      style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.cardContainer}
        data={upcomingVisitor}
        renderItem={({ item }) => <VisitorCard visitor={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  cardContainer: {
    width: '100%',
  },
});

export default CompletedVisitorScreen;
