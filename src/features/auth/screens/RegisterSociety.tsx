import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import {View, Text, TextInput, Button} from '../../../components';
import {useTheme} from '../../../theme/ThemeContext';
import Icon from '../../../components/Icon';
import Header from '../../../components/Header';

const RegisterSocietyScreen: React.FC = () => {
    const {colors} = useTheme();
    const router = {};
    const [agree, setAgree] = React.useState(false);

    return (
        <SafeAreaView
            style={[
                styles.container,
                {
                    backgroundColor: colors.n100,
                },
            ]}>
            <Header type="secondary" title="Register" />
            <ScrollView>
                <View style={[styles.titleContainer]}>
                    <Text h5 n700>
                        Create your account
                    </Text>
                    <Text caption n400>
                        Fill out the form below to create your account and start
                        managing your finances effortlessly.
                    </Text>
                </View>
                <View
                    style={[
                        styles.wrapper,
                        {
                            backgroundColor: colors.n50,
                        },
                    ]}>
                    <TextInput type="user" placeholder="Your name" />
                    <TextInput type="phone-other" placeholder="Phone number" />
                    <TextInput type="email" placeholder="Phone number" />
                    <TextInput type="password" placeholder="Password" />
                    <TextInput type="password" placeholder="Confirm password" />

                    <Button
                        type="primary"
                        style={{marginTop: 24}}
                        // onPress={() => router.push("/")}
                    >
                        <Text base blue50>
                            Register
                        </Text>
                    </Button>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    titleContainer: {
        marginTop: 24,
        paddingHorizontal: 16,
        gap: 8,
    },

    wrapper: {
        marginHorizontal: 16,
        marginTop: 24,
        padding: 16,
        gap: 8,
        borderRadius: 12,
    },

    socialButtons: {
        marginTop: 24,
        flexDirection: 'row',
        gap: 8,
    },

    socialButton: {
        flex: 1,
        flexDirection: 'row',
        gap: 8,
    },
    flexRowStart: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '100%',
    },
});
export default RegisterSocietyScreen;
