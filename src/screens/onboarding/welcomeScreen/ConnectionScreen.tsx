import React, {useState, useEffect, useCallback, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Platform,
  TouchableOpacity,
  PermissionsAndroid,
  Animated,
  Easing,
} from 'react-native';
import {BleManager} from 'react-native-ble-plx';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const bleManager = new BleManager();

interface ScannedDevice {
  id: string;
  name: string;
  rssi: number | null;
}

export default function ConnectionScreen() {
  const [scanStatus, setScanStatus] = useState<string>(
    'Waiting to find your TotsTracker',
  );
  const [devices, setDevices] = useState<Record<string, ScannedDevice>>({});
  const [isScanning, setIsScanning] = useState<boolean>(false);

  const scanAnimation = useRef(new Animated.Value(0)).current;

  const checkPermissions = async (): Promise<boolean> => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'TotsTracker Needs Location Permission',
          message:
            'TotsTracker needs access to your location to find nearby devices.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true; // iOS doesn't require explicit permission for BLE scanning
  };

  const startScanAnimation = () => {
    Animated.loop(
      Animated.timing(scanAnimation, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  };

  const stopScanAnimation = () => {
    scanAnimation.stopAnimation();
    scanAnimation.setValue(0);
  };

  const searchForDevices = useCallback(async () => {
    const permissionGranted = await checkPermissions();
    if (!permissionGranted) {
      setScanStatus('Oops! We need permission to find TotsTracker');
      return;
    }

    setScanStatus('Looking for your TotsTracker');
    setDevices({});
    setIsScanning(true);
    startScanAnimation();

    try {
      bleManager.startDeviceScan(null, null, (error, device: any) => {
        if (error) {
          setScanStatus('Uh-oh! We had trouble finding TotsTracker');
          setIsScanning(false);
          stopScanAnimation();
          return;
        }

        //@ts-ignore
        setDevices(prevDevices => ({
          ...prevDevices,
          [device.id]: {
            id: device.id,
            name: device.name,
            rssi: device.rssi,
          },
        }));
      });

      setTimeout(() => {
        bleManager.stopDeviceScan();
        setScanStatus("All done! Here's what we found");
        setIsScanning(false);
        stopScanAnimation();
      }, 10000); // 10 seconds scan time
    } catch (e) {
      setScanStatus('Oops! Something went wrong');
      setIsScanning(false);
      stopScanAnimation();
    }
  }, []);

  useEffect(() => {
    checkState();
  }, [searchForDevices]);

  const checkState = async () => {
    bleManager.state().then(state => {
      if (state === 'PoweredOn') {
        searchForDevices();
      } else {
        setScanStatus('Please turn on Bluetooth to find TotsTracker');
      }
    });
  };

  const renderDeviceItem = ({item}: {item: ScannedDevice}) => (
    <TouchableOpacity style={styles.deviceItem}>
      <Icon name="bluetooth-audio" size={30} color="#4A90E2" />
      <View style={styles.deviceInfo}>
        <Text style={styles.deviceName}>{item.name}</Text>
        <Text style={styles.deviceId}>Tap to connect</Text>
      </View>
      <Icon name="chevron-right" size={30} color="#4A90E2" />
    </TouchableOpacity>
  );

  const spin = scanAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find Your TotsTracker</Text>
      <Animated.View style={[styles.scanIcon, {transform: [{rotate: spin}]}]}>
        <Icon name="radar" size={100} color="#4A90E2" />
      </Animated.View>
      <Text style={styles.status}>{scanStatus}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={searchForDevices}
        disabled={isScanning}>
        <Text style={styles.buttonText}>
          {isScanning ? 'Searching...' : 'Find TotsTracker'}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={Object.values(devices)}
        renderItem={renderDeviceItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.deviceList}
        ListEmptyComponent={
          <Text style={styles.emptyList}>
            {isScanning
              ? 'Looking for TotsTrackers...'
              : 'No TotsTrackers found. Try again!'}
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F8FF', // Light blue background
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#4A90E2',
    marginBottom: 20,
  },
  scanIcon: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  status: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4A90E2',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center', // Center the text within the button
  },
  deviceList: {
    paddingBottom: 20,
  },
  deviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  deviceInfo: {
    flex: 1,
    marginLeft: 15,
  },
  deviceName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
  deviceId: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  emptyList: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginTop: 20,
  },
});
