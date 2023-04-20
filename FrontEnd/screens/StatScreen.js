
import { View, Text, StyleSheet } from 'react-native';

const StatScreen = () => {

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Statistiques</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F1F1F1',
        paddingHorizontal: 20,
        paddingTop: 30,
        paddingBottom: 10,
    },
    header: {
        fontSize: 34,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: 'black',
    }
});

export default StatScreen;