import React from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import {useTheme} from '../../../theme/ThemeContext.tsx';
import {Button, HeadingWithLine, Text, View} from '../../../components';
import {useNavigation} from '@react-navigation/native';
import {images} from '../../../utils';
import Header from '../../../components/Header.tsx';
import {OtpInput} from 'react-native-otp-entry';

const OtpVerificationScreen: React.FC = () => {
    const {colors} = useTheme();
    const router = useNavigation();
    return (
        <SafeAreaView
            style={[
                styles.container,
                {
                    backgroundColor: colors.n100,
                },
            ]}>
            <ScrollView contentContainerStyle={{width: '100%'}}>
                <Image source={images.scoiety1} style={styles.image} />
                <View style={[styles.titleContainer]}>
                    <Text h5 n700>
                        Manage. Connect. Live Better.
                    </Text>
                </View>

                <View
                    style={[
                        styles.wrapper,
                        {
                            backgroundColor: colors.n50,
                        },
                    ]}>
                    <HeadingWithLine
                        title="OTP Verification"
                        style={{marginVertical: 10}}
                    />
                    <Text
                        caption
                        n400
                        style={{textAlign: 'justify', marginVertical: 10}}>
                        Please enter the verification code sent to your
                        registered number.
                    </Text>
                    <OtpInput
                        numberOfDigits={6}
                        theme={{
                            focusedPinCodeContainerStyle: {
                                borderColor: colors.blue600,
                            },
                        }}
                        onTextChange={text => console.log(text)}
                    />
                    <Button type="primary" style={{marginVertical: 24}}>
                        <Text base blue50>
                            Send OTP
                        </Text>
                    </Button>
                </View>
                <View style={styles.bottomContainer}>
                    <Text caption n400>
                        Edit phone number?{' '}
                    </Text>
                    <TouchableOpacity>
                        <Text captionMedium blue500>
                            Change phone number
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },

    titleContainer: {
        paddingHorizontal: 16,
        marginTop: 64,
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
    line: {
        flex: 1,
        height: 1,
    },
    section: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bottomContainer: {
        padding: 16,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        alignSelf: 'flex-end',
    },
    image: {
        width: '100%',
        aspectRatio: 1.5,
        height: 'auto',

        // height: 'auto',
    },
});
export default OtpVerificationScreen;
