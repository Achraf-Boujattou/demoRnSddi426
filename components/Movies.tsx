import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Keyboard,
  Dimensions,
} from 'react-native';
import axios from 'axios';

// ⚠️ Clé gratuite sur : https://www.omdbapi.com/apikey.aspx
const API_KEY = 'b9bd48a6';
const BASE_URL = 'https://www.omdbapi.com/';
const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

// ─── Types ─────────────────────────────────────────────────────
type MovieItem = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type: string;
};

type MovieDetail = MovieItem & {
  Plot: string;
  Director: string;
  Actors: string;
  Genre: string;
  Runtime: string;
  imdbRating: string;
  Language: string;
  Country: string;
  Awards: string;
};

const QUICK_SEARCHES = ['Batman', 'Marvel', 'Star Wars', 'Harry Potter', 'Fast', 'James Bond'];

// ─── Composant principal ───────────────────────────────────────
const Movies = ({ navigation }: { navigation: any }) => {
  const [searchText, setSearchText]       = useState('');
  const [results, setResults]             = useState<MovieItem[]>([]);
  const [detail, setDetail]               = useState<MovieDetail | null>(null);
  const [loading, setLoading]             = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [error, setError]                 = useState<string | null>(null);
  const [searched, setSearched]           = useState(false);
  const [modalVisible, setModalVisible]   = useState(false);
  const inputRef = useRef<TextInput>(null);

  // ── Recherche films ─────────────────────────────────────────
  const searchMovies = async (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;

    setLoading(true);
    setError(null);
    setResults([]);
    setSearched(true);
    Keyboard.dismiss();

    try {
      const res = await axios.get(BASE_URL, {
        params: { s: trimmed, apikey: API_KEY },
      });

      if (res.data.Response === 'True') {
        setResults(res.data.Search);
      } else {
        setError(res.data.Error ?? 'Aucun résultat trouvé.');
      }
    } catch {
      setError('Impossible de se connecter. Vérifiez votre connexion.');
    } finally {
      setLoading(false);
    }
  };

  // ── Détail d'un film ────────────────────────────────────────
  const openDetail = async (imdbID: string) => {
    setModalVisible(true);
    setDetailLoading(true);
    setDetail(null);

    try {
      const res = await axios.get(BASE_URL, {
        params: { i: imdbID, apikey: API_KEY, plot: 'full' },
      });
      setDetail(res.data);
    } catch {
      setModalVisible(false);
    } finally {
      setDetailLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchText.trim()) {
      searchMovies(searchText);
      setSearchText('');
    }
  };

  // ── Rendu carte film ────────────────────────────────────────
  const renderMovie = ({ item }: { item: MovieItem }) => (
    <TouchableOpacity style={styles.card} onPress={() => openDetail(item.imdbID)} activeOpacity={0.85}>
      <Image
        source={{
          uri: item.Poster !== 'N/A' ? item.Poster : 'https://via.placeholder.com/300x450/1a1a2e/ffffff?text=No+Poster',
        }}
        style={styles.poster}
        resizeMode="cover"
      />
      <View style={styles.cardOverlay}>
        <View style={styles.typeBadge}>
          <Text style={styles.typeText}>{item.Type === 'movie' ? '🎬' : item.Type === 'series' ? '📺' : '🎭'}</Text>
        </View>
      </View>
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle} numberOfLines={2}>{item.Title}</Text>
        <Text style={styles.cardYear}>{item.Year}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f0c29" />

      {/* ── Barre de recherche ───────────────────────────── */}
      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            ref={inputRef}
            style={styles.searchInput}
            placeholder="Rechercher un film..."
            placeholderTextColor="rgba(255,255,255,0.4)"
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
            selectionColor="#e94560"
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

      {/* ── Suggestions rapides ──────────────────────────── */}
      {!searched && (
        <View style={styles.quickSection}>
          <Text style={styles.quickLabel}>Populaires</Text>
          <FlatList
            horizontal
            data={QUICK_SEARCHES}
            keyExtractor={item => item}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 20 }}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.chip} onPress={() => searchMovies(item)}>
                <Text style={styles.chipText}>🎬 {item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      {/* ── État : chargement ────────────────────────────── */}
      {loading && (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#e94560" />
          <Text style={styles.loadingText}>Recherche en cours...</Text>
        </View>
      )}

      {/* ── État : erreur ────────────────────────────────── */}
      {!loading && error && (
        <View style={styles.centered}>
          <Text style={{ fontSize: 50, marginBottom: 12 }}>🎭</Text>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {/* ── État : vide (accueil) ────────────────────────── */}
      {!loading && !error && !searched && (
        <View style={styles.centered}>
          <Text style={{ fontSize: 80 }}>🎬</Text>
          <Text style={styles.heroText}>Découvrez des films</Text>
          <Text style={styles.heroSub}>Recherchez un titre, acteur ou série</Text>
        </View>
      )}

      {/* ── Résultats ────────────────────────────────────── */}
      {!loading && results.length > 0 && (
        <FlatList
          data={results}
          keyExtractor={item => item.imdbID}
          renderItem={renderMovie}
          numColumns={2}
          contentContainerStyle={styles.grid}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          ListHeaderComponent={
            <Text style={styles.resultsCount}>{results.length} résultat(s) trouvé(s)</Text>
          }
        />
      )}

      {/* ── Modal détail film ────────────────────────────── */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>

            {detailLoading ? (
              <View style={styles.modalLoading}>
                <ActivityIndicator size="large" color="#e94560" />
                <Text style={styles.loadingText}>Chargement...</Text>
              </View>
            ) : detail ? (
              <ScrollView showsVerticalScrollIndicator={false}>
                {/* Poster */}
                <Image
                  source={{
                    uri: detail.Poster !== 'N/A' ? detail.Poster : 'https://via.placeholder.com/300x450/1a1a2e/ffffff?text=No+Poster',
                  }}
                  style={styles.modalPoster}
                  resizeMode="cover"
                />

                {/* Rating badge */}
                <View style={styles.ratingBadge}>
                  <Text style={styles.ratingText}>⭐ {detail.imdbRating} / 10</Text>
                </View>

                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>{detail.Title}</Text>
                  <Text style={styles.modalMeta}>{detail.Year}  •  {detail.Runtime}  •  {detail.Genre}</Text>

                  <View style={styles.divider} />

                  <Text style={styles.sectionLabel}>Synopsis</Text>
                  <Text style={styles.modalPlot}>{detail.Plot}</Text>

                  <View style={styles.divider} />

                  <DetailRow icon="🎬" label="Réalisateur" value={detail.Director} />
                  <DetailRow icon="🎭" label="Acteurs"     value={detail.Actors} />
                  <DetailRow icon="🌍" label="Pays"        value={detail.Country} />
                  <DetailRow icon="🗣️"  label="Langue"      value={detail.Language} />
                  {detail.Awards !== 'N/A' && (
                    <DetailRow icon="🏆" label="Récompenses" value={detail.Awards} />
                  )}
                </View>
              </ScrollView>
            ) : null}

            {/* Bouton fermer */}
            <TouchableOpacity style={styles.closeBtn} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeBtnText}>✕ Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
};

// ── Composant ligne détail ──────────────────────────────────────
const DetailRow = ({ icon, label, value }: { icon: string; label: string; value: string }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailIcon}>{icon}</Text>
    <View style={{ flex: 1 }}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  </View>
);

export default Movies;

// ─── Styles ────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0c29',
  },

  // ── Recherche ──
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginHorizontal: 16,
    gap: 10,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderWidth: 1,
    borderColor: 'rgba(233,69,96,0.4)',
  },
  searchIcon: { fontSize: 16, marginRight: 8 },
  searchInput: { flex: 1, fontSize: 15, color: '#fff', paddingVertical: 0 },
  clearBtn: { color: 'rgba(255,255,255,0.5)', fontSize: 16, paddingLeft: 8 },
  searchBtn: {
    backgroundColor: '#e94560',
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 13,
  },
  searchBtnText: { color: '#fff', fontWeight: '800', fontSize: 15 },

  // ── Chips ──
  quickSection: { marginTop: 16 },
  quickLabel: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginLeft: 20,
    marginBottom: 8,
  },
  chip: {
    backgroundColor: 'rgba(233,69,96,0.18)',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'rgba(233,69,96,0.35)',
  },
  chipText: { color: '#fff', fontSize: 13 },

  // ── Grid films ──
  grid: { padding: 16, paddingBottom: 40 },
  resultsCount: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 13,
    marginBottom: 14,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  poster: {
    width: '100%',
    height: CARD_WIDTH * 1.5,
  },
  cardOverlay: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  typeBadge: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  typeText: { fontSize: 14 },
  cardInfo: { padding: 10 },
  cardTitle: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 18,
  },
  cardYear: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 12,
    marginTop: 4,
  },

  // ── États ──
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  loadingText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 15,
    marginTop: 14,
  },
  errorText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  heroText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '800',
    marginTop: 20,
    textAlign: 'center',
  },
  heroSub: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 15,
    marginTop: 8,
    textAlign: 'center',
  },

  // ── Modal ──
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#1a1a2e',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    maxHeight: '92%',
    overflow: 'hidden',
  },
  modalLoading: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalPoster: {
    width: '100%',
    height: 300,
  },
  ratingBadge: {
    position: 'absolute',
    top: 260,
    right: 20,
    backgroundColor: '#e94560',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  ratingText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 14,
  },
  modalContent: { padding: 22 },
  modalTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '800',
    lineHeight: 30,
    marginBottom: 8,
    paddingRight: 80,
  },
  modalMeta: {
    color: 'rgba(255,255,255,0.55)',
    fontSize: 13,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginVertical: 18,
  },
  sectionLabel: {
    color: '#e94560',
    fontSize: 13,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 10,
  },
  modalPlot: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 15,
    lineHeight: 24,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14,
    gap: 12,
  },
  detailIcon: { fontSize: 20, marginTop: 2 },
  detailLabel: {
    color: 'rgba(255,255,255,0.45)',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  detailValue: {
    color: '#fff',
    fontSize: 14,
    marginTop: 2,
    lineHeight: 20,
  },
  closeBtn: {
    backgroundColor: '#e94560',
    margin: 16,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  closeBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
