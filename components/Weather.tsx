import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TextInput,
  Keyboard,
  FlatList,
} from 'react-native';
import axios from 'axios';

// ⚠️ Remplace par ta propre clé sur : https://openweathermap.org/api
const API_KEY = '01b415dbf0fb98db51997b09b3fb01eb';

type WeatherData = {
  name: string;
  sys: { country: string };
  main: { temp: number; pressure: number; humidity: number; feels_like: number };
  weather: { description: string; main: string }[];
  wind: { speed: number };
};

const COUNTRY_NAMES: Record<string, string> = {
  MA: 'Maroc 🇲🇦',
  EH: 'Maroc 🇲🇦', // Sahara Occidental (Dakhla, Laâyoune...) administré par le Maroc
  FR: 'France 🇫🇷',
  US: 'États-Unis 🇺🇸',
  EG: 'Égypte 🇪🇬',
  DZ: 'Algérie 🇩🇿',
  TN: 'Tunisie 🇹🇳',
  SA: 'Arabie Saoudite 🇸🇦',
  GB: 'Royaume-Uni 🇬🇧',
  DE: 'Allemagne 🇩🇪',
  ES: 'Espagne 🇪🇸',
  TR: 'Turquie 🇹🇷',
};

const WEATHER_EMOJI: Record<string, string> = {
  Clear: '☀️',
  Clouds: '☁️',
  Rain: '🌧️',
  Drizzle: '🌦️',
  Thunderstorm: '⛈️',
  Snow: '❄️',
  Mist: '🌫️',
  Fog: '🌁',
};

// Villes suggérées rapides
const QUICK_CITIES = ['Casablanca', 'Paris', 'London', 'Dubai', 'New York', 'Madrid', 'Istanbul'];

const Weather = ({ navigation }: { navigation: any }) => {
  const [weatherData, setWeatherData]   = useState<WeatherData | null>(null);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState<string | null>(null);
  const [city, setCity]                 = useState('Casablanca');
  const [searchText, setSearchText]     = useState('');
  const [history, setHistory]           = useState<string[]>([]);
  const inputRef = useRef<TextInput>(null);

  // ─── Fetch météo ───────────────────────────────────────────
  const fetchWeather = async (targetCity: string) => {
    const trimmed = targetCity.trim();
    if (!trimmed) return;

    setLoading(true);
    setError(null);
    Keyboard.dismiss();

    try {
      const response = await axios.get<WeatherData>(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(trimmed)}&appid=${API_KEY}&units=metric&lang=fr`
      );
      setWeatherData(response.data);
      setCity(trimmed);
      // Ajouter à l'historique (max 5, pas de doublon)
      setHistory(prev => {
        const filtered = prev.filter(c => c.toLowerCase() !== trimmed.toLowerCase());
        return [trimmed, ...filtered].slice(0, 5);
      });
    } catch (err: any) {
      if (err?.response?.status === 401) {
        setError('Clé API invalide. Vérifiez votre clé OpenWeatherMap.');
      } else if (err?.response?.status === 404) {
        setError(`Ville "${trimmed}" introuvable. Vérifiez l'orthographe.`);
      } else {
        setError('Impossible de récupérer la météo. Vérifiez votre connexion.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchText.trim()) {
      fetchWeather(searchText);
      setSearchText('');
    }
  };

  useEffect(() => {
    fetchWeather('Casablanca');
  }, []);

  const getCountryName = (code: string) => COUNTRY_NAMES[code] ?? code;
  const getEmoji       = (main: string)  => WEATHER_EMOJI[main] ?? '🌡️';

  // ─── Loading ───────────────────────────────────────────────
  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loadingText}>Chargement de la météo...</Text>
      </SafeAreaView>
    );
  }

  // ─── Erreur ────────────────────────────────────────────────
  if (error) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.errorEmoji}>⚠️</Text>
        <Text style={styles.errorTitle}>Erreur</Text>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryBtn} onPress={() => fetchWeather(city)}>
          <Text style={styles.retryText}>🔄 Réessayer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backBtnSmall} onPress={() => navigation.goBack()}>
          <Text style={styles.backBtnSmallText}>← Retour</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const { name, sys, main, weather, wind } = weatherData!;
  const emoji = getEmoji(weather[0]?.main);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4c47d9" />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >

        {/* ── Barre de recherche ─────────────────────────── */}
        <View style={styles.searchWrapper}>
          <View style={styles.searchBar}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              ref={inputRef}
              style={styles.searchInput}
              placeholder="Rechercher une ville..."
              placeholderTextColor="rgba(255,255,255,0.5)"
              value={searchText}
              onChangeText={setSearchText}
              onSubmitEditing={handleSearch}
              returnKeyType="search"
              selectionColor="#fff"
            />
            {searchText.length > 0 && (
              <TouchableOpacity onPress={() => setSearchText('')}>
                <Text style={styles.clearBtn}>✕</Text>
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
            <Text style={styles.searchBtnText}>OK</Text>
          </TouchableOpacity>
        </View>

        {/* ── Historique & suggestions rapides ──────────── */}
        {history.length > 0 && (
          <View style={styles.chipsSection}>
            <Text style={styles.chipsLabel}>Récents</Text>
            <FlatList
              horizontal
              data={history}
              keyExtractor={(item) => item}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.chip}
                  onPress={() => fetchWeather(item)}
                >
                  <Text style={styles.chipText}>🕐 {item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}

        {/* ── Suggestions rapides ───────────────────────── */}
        <View style={styles.chipsSection}>
          <Text style={styles.chipsLabel}>Suggestions</Text>
          <FlatList
            horizontal
            data={QUICK_CITIES.filter(c => c.toLowerCase() !== name.toLowerCase())}
            keyExtractor={(item) => item}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.chip, styles.chipSuggestion]}
                onPress={() => fetchWeather(item)}
              >
                <Text style={styles.chipText}>🌍 {item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* ── En-tête météo ─────────────────────────────── */}
        <View style={styles.header}>
          <Text style={styles.cityName}>{name}</Text>
          <Text style={styles.countryName}>{getCountryName(sys.country)}</Text>
          <Text style={styles.weatherEmoji}>{emoji}</Text>
          <Text style={styles.temp}>{Math.round(main.temp)}°C</Text>
          <Text style={styles.description}>{weather[0]?.description}</Text>
          <Text style={styles.feelsLike}>Ressenti : {Math.round(main.feels_like)}°C</Text>
        </View>

        {/* ── Cartes de détails ─────────────────────────── */}
        <View style={styles.cardsGrid}>
          <InfoCard icon="💧" label="Humidité"  value={`${main.humidity}%`} />
          <InfoCard icon="🌬️" label="Pression"  value={`${main.pressure} hPa`} />
          <InfoCard icon="🍃" label="Vent"       value={`${wind.speed} m/s`} />
        </View>

        {/* ── Bouton Retour ─────────────────────────────── */}
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backBtnText}>← Retour au tableau de bord</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

// ─── Composant carte info ──────────────────────────────────────
const InfoCard = ({ icon, label, value }: { icon: string; label: string; value: string }) => (
  <View style={styles.card}>
    <Text style={styles.cardIcon}>{icon}</Text>
    <Text style={styles.cardLabel}>{label}</Text>
    <Text style={styles.cardValue}>{value}</Text>
  </View>
);

export default Weather;

// ─── Styles ────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4c47d9',
  },
  scroll: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4c47d9',
    padding: 30,
  },

  // ── Barre de recherche ──
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 20,
    gap: 10,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
    paddingVertical: 0,
  },
  clearBtn: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 16,
    paddingLeft: 8,
  },
  searchBtn: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  searchBtnText: {
    color: '#4c47d9',
    fontWeight: '800',
    fontSize: 15,
  },

  // ── Chips historique / suggestions ──
  chipsSection: {
    marginTop: 14,
    paddingLeft: 20,
  },
  chipsLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  chip: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
  },
  chipSuggestion: {
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  chipText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '500',
  },

  // ── Header météo ──
  header: {
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  cityName: {
    fontSize: 36,
    fontWeight: '800',
    color: '#fff',
  },
  countryName: {
    fontSize: 17,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  weatherEmoji: {
    fontSize: 75,
    marginVertical: 16,
  },
  temp: {
    fontSize: 70,
    fontWeight: '300',
    color: '#fff',
  },
  description: {
    fontSize: 20,
    color: 'rgba(255,255,255,0.85)',
    textTransform: 'capitalize',
    marginTop: 8,
  },
  feelsLike: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 6,
  },

  // ── Cards ──
  cardsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 20,
    marginBottom: 30,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 14,
    alignItems: 'center',
    width: '30%',
  },
  cardIcon: {
    fontSize: 26,
    marginBottom: 8,
  },
  cardLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
  },

  // ── Bouton retour ──
  backBtn: {
    backgroundColor: '#fff',
    marginHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
  },
  backBtnText: {
    color: '#4c47d9',
    fontSize: 16,
    fontWeight: '700',
  },

  // ── Loading ──
  loadingText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 16,
  },

  // ── Error ──
  errorEmoji: { fontSize: 60, marginBottom: 16 },
  errorTitle: { fontSize: 24, fontWeight: '800', color: '#fff', marginBottom: 8 },
  errorText: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  retryBtn: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginBottom: 12,
  },
  retryText: { color: '#4c47d9', fontSize: 16, fontWeight: '700' },
  backBtnSmall: { paddingVertical: 10 },
  backBtnSmallText: { color: 'rgba(255,255,255,0.7)', fontSize: 15 },
});