import React, {useEffect, useState} from 'react';
import {
    FlatList,
    Modal,
    ScrollView,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import {Header, TextInput, View} from './index.ts';
import Text from './Text.tsx';

import {countryFLagAndPhoneCode} from '../utils/countryPhoneCode';
import {useTheme} from '../theme/ThemeContext.tsx';
interface CoutryCode {
    flag: string;
    code: string;
    country: string;
}
const flagCodeMap: Record<string, CoutryCode> = {};
countryFLagAndPhoneCode.forEach(data => {
    // @ts-ignore
    flagCodeMap[data.code] = {
        country: data.name,
        flag: data.flag,
        code: data.dial_code,
    };
});

type Props = {
    callBack: (code: CoutryCode | null, update : boolean) => void;
    visibility: boolean;
    defaultValue: string;
};
const CountrySelector: React.FC<Props> = ({callBack, visibility, defaultValue}) => {
    const [state, setState] = useState(visibility);
    const [viewedList, updateViewedList] = useState<any>( Object.values(flagCodeMap));

    useEffect(() => {
        callBack(flagCodeMap[defaultValue], true);
    }, []);
    useEffect(() => {
        setState(visibility);
    }, [visibility]);

    const updateListHandler = value => {
        let newList: CoutryCode[] = Object.values(flagCodeMap).filter(data =>
            data.country.toLowerCase().includes(value.toLowerCase()),
        );
        updateViewedList(newList);
    };
    const {colors} = useTheme();
    return (
        <Modal
            statusBarTranslucent={true}
            visible={state}
            style={{height : "50%"}}
            animationType="slide"
            transparent={true} // full-screen effect
        >
            <View
                style={[
                    styles.container,
                    {backgroundColor: colors.n100},
                ]}>
                <Header
                    type="secondary"
                    title="Select Country"
                    onPress={() => callBack(null, false)}
                />
                <TextInput
                    type="search"
                    placeholder="Search country"
                    onChangeText={updateListHandler}
                />
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        style={styles.list}
                        data={viewedList}
                        renderItem={data => (
                            <TouchableOpacity
                                style={styles.listItem}
                                onPress={() => {
                                    callBack(data.item, true);
                                }}>
                                <Text h5 style={{width: 60}}>
                                    {data.item.flag}
                                </Text>
                                <Text base style={{flex: 1}}>
                                    {data.item.country}
                                </Text>
                                <Text base style={{textAlign: 'center'}}>
                                    {data.item.code}
                                </Text>
                            </TouchableOpacity>
                        )}
                    />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        marginTop: "50%",
        borderTopLeftRadius : 50,
        borderTopRightRadius : 50,
        elevation : 3
    },
    list: {
        flex: 1,
        width: '100%',
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        flex: 1,
        marginVertical: 10,
    },
});

export default CountrySelector;
