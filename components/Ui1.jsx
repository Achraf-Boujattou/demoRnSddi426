import React from 'react'
import {
  View, TextInput, TouchableOpacity, Text, StyleSheet,
  Alert, Switch, ActivityIndicator, ScrollView, FlatList,
  Pressable, Modal, RefreshControl, SectionList,
  KeyboardAvoidingView, Platform, Vibration, Share,
  Animated, Dimensions
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Svg, { Circle, Text as SvgText } from 'react-native-svg'

export default class UiExample extends React.Component {

  state = {
    email: '',
    password: '',
    rememberMe: false,
    loading: false,
    selectedItem: null,
    data: ['React', 'Angular', 'Vue', 'Laravel'],

    // nouveaux widgets
    selectedTag: 'All',
    isAccordionOpen: false,
    isModalVisible: false,
    refreshing: false,
    fadeAnim: new Animated.Value(0),
    search: '',
    sectionData: [
      { title: 'Frontend', data: ['React Native', 'React', 'Angular', 'Vue'] },
      { title: 'Backend', data: ['Node JS', 'Laravel', 'Python', 'Firebase'] },
      { title: 'Tools', data: ['Git', 'Docker', 'Jenkins', 'Figma'] }
    ],
    featuredItems: [
      { id: 1, title: 'Summer Offer', color: '#FFD700', icon: 'sunny' },
      { id: 2, title: 'New Arrival', color: '#FF6347', icon: 'cart' },
      { id: 3, title: 'Flash Sale', color: '#32CD32', icon: 'flash' }
    ]
  }

  componentDidMount() {
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true
    }).start()
  }

  onRefresh = () => {
    this.setState({ refreshing: true })
    Vibration.vibrate(50)
    setTimeout(() => this.setState({ refreshing: false }), 2000)
  }

  toggleModal = () => {
    Vibration.vibrate(30)
    this.setState({ isModalVisible: !this.state.isModalVisible })
  }

  handleShare = async () => {
    try {
      await Share.share({
        message: 'Regardez mon superbe profil sur My Premium App!',
        url: 'https://monapp.com'
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  toggleAccordion = () => this.setState({ isAccordionOpen: !this.state.isAccordionOpen })
  setTag = (tag) => this.setState({ selectedTag: tag })

  handleEmail = (text) => this.setState({ email: text })
  handlePass = (text) => this.setState({ password: text })

  toggleSwitch = () => {
    this.setState({ rememberMe: !this.state.rememberMe })
  }

  selectItem = (item) => {
    this.setState({ selectedItem: item })
  }

  afficheAlert = () => {
    this.setState({ loading: true })

    setTimeout(() => {
      this.setState({ loading: false })

      Alert.alert(
        "Informations",
        `Email: ${this.state.email}
Password: ${this.state.password}
Remember: ${this.state.rememberMe}
Selected: ${this.state.selectedItem}`
      )
    }, 1500)
  }

  renderItem = ({ item }) => (
    <Pressable
      style={[
        styles.listItem,
        this.state.selectedItem === item && styles.activeItem
      ]}
      onPress={() => {
        this.selectItem(item)
        Vibration.vibrate(20)
      }}
    >
      <Icon name="code-slash-outline" size={18} color="#5f5cff" style={{ marginRight: 15 }} />
      <Text style={{ flex: 1, fontWeight: '500' }}>{item}</Text>
      <Icon name="chevron-forward-outline" size={14} color="#CCC" />
    </Pressable>
  )

  renderSectionHeader = ({ section: { title } }) => (
    <Text style={styles.sectionTitle}>{title}</Text>
  )

  render() {
    return (
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <SectionList
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollContainer}
          sections={this.state.sectionData}
          keyExtractor={(item, i) => i.toString()}
          renderItem={this.renderItem}
          renderSectionHeader={this.renderSectionHeader}
          refreshControl={
            <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} colors={['#5f5cff']} />
          }
          ListHeaderComponent={() => (
            <Animated.View style={{ opacity: this.state.fadeAnim }}>
              {/* HEADER with Notification Badge */}
              <View style={[styles.row, { marginTop: 10, marginBottom: 5 }]}>
                <View>
                  <Text style={styles.header}>Tableau de Bord</Text>
                  {/* DEVICE INFO WIDGET moved here for better alignment */}
                  <View style={styles.deviceInfo}>
                    <Text style={styles.deviceText}>
                      {Platform.OS.toUpperCase()} v{Platform.Version} • {Dimensions.get('window').width.toFixed(0)}x{Dimensions.get('window').height.toFixed(0)}
                    </Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <TouchableOpacity style={[styles.notifBadge, { marginRight: 10 }]} onPress={this.handleShare}>
                    <Icon name="share-social-outline" size={22} color="#5f5cff" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.notifBadge} onPress={this.toggleModal}>
                    <Icon name="notifications-outline" size={24} color="#5f5cff" />
                    <View style={styles.badge}><Text style={styles.badgeText}>3</Text></View>
                  </TouchableOpacity>
                </View>
              </View>

              {/* SEARCH BAR */}
              <View style={styles.searchBar}>
                <Icon name="search-outline" size={20} color="#999" />
                <TextInput 
                  placeholder="Rechercher un widget..." 
                  style={styles.searchInput}
                  onChangeText={(text) => this.setState({ search: text })}
                />
                <TouchableOpacity>
                  <Icon name="options-outline" size={20} color="#5f5cff" />
                </TouchableOpacity>
              </View>

              {/* FEATURED CAROUSEL (Horizontal Scroll) */}
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.carousel}>
                {this.state.featuredItems.map(item => (
                  <TouchableOpacity key={item.id} style={[styles.carouselCard, { backgroundColor: item.color }]}>
                    <Icon name={item.icon} size={30} color="#fff" />
                    <Text style={styles.carouselTitle}>{item.title}</Text>
                    <Text style={styles.carouselSub}>-50% OFF</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              {/* QUICK ACTIONS */}
              <Text style={styles.sectionTitle}>Actions Rapides</Text>
              <View style={styles.grid}>
                {[
                  { label: 'Pay', icon: 'card', color: '#4CAF50' },
                  { label: 'Chat', icon: 'chatbubbles', color: '#2196F3' },
                  { label: 'Stats', icon: 'analytics', color: '#FF9800' },
                  { label: 'Doc', icon: 'document-text', color: '#9C27B0' }
                ].map((action, i) => (
                  <TouchableOpacity key={i} style={styles.gridItem} onPress={() => Vibration.vibrate(10)}>
                    <View style={[styles.gridIcon, { backgroundColor: action.color + '20' }]}>
                      <Icon name={action.icon} size={24} color={action.color} />
                    </View>
                    <Text style={styles.gridLabel}>{action.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* PROFILE */}
              <View style={styles.card}>
                <View style={styles.row}>
                  <View style={styles.avatar}>
                    <Text style={{ color: 'white' }}>AB</Text>
                  </View>

                  <View style={{ flex: 1, marginLeft: 15 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>BOUJATTOU Achraf</Text>
                    <Text style={{ color: 'gray' }}>Administrateur</Text>
                    <Text style={{ color: '#4CAF50', fontSize: 12, fontWeight: 'bold' }}>● EN LIGNE</Text>
                  </View>

                  <TouchableOpacity style={styles.headerIcon}>
                    <Icon name="settings-outline" size={24} color="#5f5cff" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* STATS */}
              <View style={styles.statsContainer}>
                <View style={styles.statCard}>
                  <Text style={styles.statNumber}>1,284</Text>
                  <Text style={styles.statLabel}>Ventes</Text>
                </View>
                <View style={styles.statCard}>
                  <Text style={[styles.statNumber, { color: '#4CAF50' }]}>+24%</Text>
                  <Text style={styles.statLabel}>Croissance</Text>
                </View>
                <View style={styles.statCard}>
                  <Text style={styles.statNumber}>84</Text>
                  <Text style={styles.statLabel}>Tickets</Text>
                </View>
              </View>

              {/* LOGIN */}
              <View style={[styles.card, styles.loginCard]}>
                <Text style={styles.subtitle}>🔐 Accès Sécurisé</Text>

                <View style={styles.inputContainer}>
                  <Icon name="mail-outline" size={20} color="#999" style={styles.inputIcon} />
                  <TextInput 
                    style={styles.input} 
                    placeholder="Email" 
                    placeholderTextColor="#999"
                    onChangeText={this.handleEmail}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Icon name="lock-closed-outline" size={20} color="#999" style={styles.inputIcon} />
                  <TextInput 
                    style={styles.input} 
                    placeholder="Mot de passe" 
                    placeholderTextColor="#999"
                    secureTextEntry 
                    onChangeText={this.handlePass}
                  />
                </View>

                <View style={[styles.row, { marginVertical: 10 }]}>
                  <Text style={{ color: '#555' }}>Se souvenir de moi</Text>
                  <Switch 
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={this.state.rememberMe ? "#5f5cff" : "#f4f3f4"}
                    value={this.state.rememberMe} 
                    onValueChange={this.toggleSwitch}
                  />
                </View>

                <TouchableOpacity 
                  style={[styles.button, this.state.loading && { opacity: 0.7 }]} 
                  onPress={this.afficheAlert}
                  disabled={this.state.loading}
                >
                  {this.state.loading ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <Text style={styles.buttonText}>Se connecter</Text>
                  )}
                </TouchableOpacity>
              </View>

              {/* ACCORDION / COLLAPSIBLE */}
              <TouchableOpacity style={styles.accordionHeader} onPress={this.toggleAccordion}>
                <Text style={styles.accordionTitle}>ℹ️ Informations Complémentaires</Text>
                <Icon name={this.state.isAccordionOpen ? 'chevron-up' : 'chevron-down'} size={20} color="#999" />
              </TouchableOpacity>
              {this.state.isAccordionOpen && (
                <View style={styles.accordionContent}>
                  <Text style={styles.accordionText}>
                    Ce projet illustre une large gamme de widgets React Native. 
                    Vous y trouverez des formulaires, des graphiques SVG, 
                    des listes dynamiques et des animations de transition.
                  </Text>
                </View>
              )}

              {/* PRICING CARD */}
              <Text style={styles.sectionTitle}>Abonnement</Text>
              <View style={[styles.card, styles.premiumCard]}>
                <View style={styles.premiumHeader}>
                  <Text style={styles.premiumTitle}>Premium Plan</Text>
                  <View style={styles.premiumTag}><Text style={styles.premiumTagText}>PRO</Text></View>
                </View>
                <Text style={styles.price}>9.99 €<Text style={styles.month}>/mois</Text></Text>
                <Text style={styles.premiumBenefit}>✅ Accès illimité à tous les widgets</Text>
                <Text style={styles.premiumBenefit}>✅ Support technique 24/7</Text>
                <TouchableOpacity style={styles.premiumButton} onPress={() => Vibration.vibrate([0, 100, 50, 100])}>
                  <Text style={styles.premiumButtonText}>Passer au Premium</Text>
                </TouchableOpacity>
              </View>

              {/* CHIPS / TAGS */}
              <Text style={styles.sectionTitle}>Catégories</Text>
              <View style={styles.chipsContainer}>
                {['All', 'Design', 'Code', 'Data', 'UI'].map(tag => (
                  <TouchableOpacity 
                    key={tag} 
                    style={[styles.chip, this.state.selectedTag === tag && styles.activeChip]}
                    onPress={() => {
                        this.setTag(tag)
                        Vibration.vibrate(10)
                    }}
                  >
                    <Text style={[styles.chipText, this.state.selectedTag === tag && styles.activeChipText]}>{tag}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* MINI CALENDAR WIDGET */}
              <Text style={styles.sectionTitle}>Calendrier</Text>
              <View style={[styles.card, styles.calendarCard]}>
                <View style={styles.calendarHeader}>
                  <Text style={styles.calendarMonth}>Avril 2026</Text>
                  <View style={styles.row}>
                    <TouchableOpacity><Icon name="chevron-back" size={20} color="#5f5cff" /></TouchableOpacity>
                    <TouchableOpacity><Icon name="chevron-forward" size={20} color="#5f5cff" /></TouchableOpacity>
                  </View>
                </View>
                <View style={styles.calendarGrid}>
                  {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map(day => (
                    <Text key={day} style={styles.dayLabel}>{day}</Text>
                  ))}
                  {[...Array(30).keys()].map(date => (
                    <TouchableOpacity 
                        key={date} 
                        style={[styles.dateBox, (date + 1) === 17 && styles.activeDate]}
                        onPress={() => Vibration.vibrate(5)}
                    >
                      <Text style={[styles.dateText, (date + 1) === 17 && styles.activeDateText]}>{date + 1}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* TASKS WIDGET */}
              <Text style={styles.sectionTitle}>Mes Tâches</Text>
              <View style={styles.card}>
                {[
                  { id: 1, task: 'Réviser React Native', done: true },
                  { id: 2, task: 'Créer un widget Calendrier', done: true },
                  { id: 3, task: 'Exporter l\'APK finale', done: false }
                ].map(item => (
                  <View key={item.id} style={styles.taskItem}>
                    <TouchableOpacity 
                        style={[styles.checkbox, item.done && styles.checkboxDone]}
                        onPress={() => Vibration.vibrate(15)}
                    >
                      {item.done && <Icon name="checkmark" size={12} color="#fff" />}
                    </TouchableOpacity>
                    <Text style={[styles.taskText, item.done && styles.taskDoneText]}>{item.task}</Text>
                  </View>
                ))}
              </View>

              {/* CREDIT CARD WIDGET */}
              <Text style={styles.sectionTitle}>Mes Cartes</Text>
              <View style={[styles.card, styles.creditCard]}>
                <View style={styles.row}>
                  <Icon name="wifi-outline" size={24} color="#fff" style={{ transform: [{ rotate: '90deg' }] }} />
                  <Text style={styles.cardBrand}>PREMIUM</Text>
                </View>
                <Text style={styles.cardNum}>**** **** **** 4260</Text>
                <View style={styles.row}>
                  <View>
                    <Text style={styles.cardLabel}>TITULAIRE</Text>
                    <Text style={styles.cardVal}>BOUJATTOU A.</Text>
                  </View>
                  <View>
                    <Text style={styles.cardLabel}>EXPIRE</Text>
                    <Text style={styles.cardVal}>12/28</Text>
                  </View>
                  <Icon name="logo-mastercard" size={40} color="#FFD700" />
                </View>
              </View>

              {/* MUSIC PLAYER WIDGET */}
              <Text style={styles.sectionTitle}>En Lecture</Text>
              <View style={[styles.card, styles.musicPlayer]}>
                <View style={styles.row}>
                  <View style={styles.musicThumb}>
                    <Icon name="musical-notes" size={24} color="#fff" />
                  </View>
                  <View style={{ flex: 1, marginLeft: 15 }}>
                    <Text style={styles.musicTitle}>React Native Rock</Text>
                    <Text style={styles.musicArtist}>Expo Beats ft. Meta</Text>
                  </View>
                </View>
                <View style={styles.progressBarBg}>
                  <View style={[styles.progressBarFill, { width: '65%' }]} />
                </View>
                <View style={[styles.row, { justifyContent: 'center', marginTop: 15 }]}>
                  <TouchableOpacity><Icon name="play-back" size={28} color="#333" /></TouchableOpacity>
                  <TouchableOpacity style={styles.playBtn}><Icon name="pause" size={32} color="#fff" /></TouchableOpacity>
                  <TouchableOpacity><Icon name="play-forward" size={28} color="#333" /></TouchableOpacity>
                </View>
              </View>

              <Text style={styles.sectionTitle}>Technologies Maîtrisées</Text>
            </Animated.View>
          )}
          ListFooterComponent={() => (
            <View style={{ paddingBottom: 60, alignItems: 'center' }}>
              <Text style={styles.footer}>© 2026 My Premium App</Text>
              <Text style={{ color: '#CCC', fontSize: 10, marginTop: 5 }}>v1.1.0-doc-ready</Text>
            </View>
          )}
        />

        {/* MODAL WIDGET */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.isModalVisible}
          onRequestClose={this.toggleModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Notifications</Text>
                <TouchableOpacity onPress={this.toggleModal}>
                  <Icon name="close" size={24} color="#333" />
                </TouchableOpacity>
              </View>
              <ScrollView>
                {[
                  { title: 'Nouveau Message', sub: 'Achraf vous a envoyé un message', icon: 'chatbubble-ellipses', color: '#2196F3' },
                  { title: 'Build Réussi', sub: 'Votre APK est prête à être téléchargée', icon: 'checkmark-circle', color: '#4CAF50' },
                  { title: 'Alerte Sécurité', sub: 'Connexion détectée depuis Casablanca', icon: 'warning', color: '#FF9800' }
                ].map((notif, i) => (
                  <View key={i} style={styles.notifItem}>
                    <View style={[styles.notifIcon, { backgroundColor: notif.color + '20' }]}>
                      <Icon name={notif.icon} size={20} color={notif.color} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.notifTitle}>{notif.title}</Text>
                      <Text style={styles.notifSub}>{notif.sub}</Text>
                    </View>
                  </View>
                ))}
              </ScrollView>
              <TouchableOpacity style={styles.button} onPress={this.toggleModal}>
                <Text style={styles.buttonText}>Tout Marquer comme Lu</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      </KeyboardAvoidingView>
    )
  }
}
const styles = StyleSheet.create({

  scrollContainer: {
    padding: 15,
    backgroundColor: '#f8f9fe',
  },

  header: {
    fontSize: 28,
    fontWeight: '900',
    color: '#1a1a1a',
    marginBottom: 5,
  },

  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 24,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  avatar: {
    width: 60,
    height: 60,
    backgroundColor: '#5f5cff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18
  },

  headerIcon: {
    padding: 8,
    backgroundColor: '#f0f0ff',
    borderRadius: 12
  },

  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },

  statCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 20,
    width: '31%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 5,
    elevation: 2
  },

  statNumber: {
    fontSize: 18,
    fontWeight: '800',
    color: '#333'
  },

  statLabel: {
    fontSize: 12,
    color: '#999',
    marginTop: 4
  },

  loginCard: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#f0f0f0'
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f7fb',
    borderRadius: 15,
    marginBottom: 12,
    paddingHorizontal: 15
  },

  inputIcon: {
    marginRight: 10
  },

  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 15,
    color: '#333'
  },

  button: {
    backgroundColor: '#5f5cff',
    padding: 16,
    alignItems: 'center',
    borderRadius: 15,
    marginTop: 10,
    shadowColor: '#5f5cff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700'
  },

  widget: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 24,
    width: '48%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3
  },

  big: {
    fontSize: 22,
    fontWeight: '800',
    color: '#333',
    marginVertical: 4
  },

  widgetSub: {
    fontSize: 13,
    color: '#999'
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    marginTop: 10,
    marginBottom: 15
  },

  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },

  progressLabel: {
    fontWeight: '600',
    color: '#555'
  },

  progressPercent: {
    fontWeight: '700',
    color: '#5f5cff'
  },

  progressBg: {
    height: 10,
    backgroundColor: '#f0f0fb',
    borderRadius: 5
  },

  progressFill: {
    height: '100%',
    backgroundColor: '#5f5cff',
    borderRadius: 5
  },

  listItem: {
    backgroundColor: 'white',
    padding: 18,
    borderRadius: 16,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent'
  },

  activeItem: {
    borderColor: '#5f5cff',
    backgroundColor: '#f0f0ff'
  },

  subtitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 20
  },

  footer: {
    textAlign: 'center',
    marginTop: 30,
    color: '#999',
    fontWeight: '600'
  },

  // NEW WIDGETS STYLES
  notifBadge: {
    backgroundColor: '#FFFFFF',
    padding: 11,
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center'
  },

  badge: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#FF5252',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff'
  },

  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold'
  },

  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    borderRadius: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5
  },

  searchInput: {
    flex: 1,
    paddingVertical: 12,
    marginLeft: 10,
    fontSize: 15,
    color: '#333'
  },

  carousel: {
    marginBottom: 20
  },

  carouselCard: {
    width: 160,
    height: 120,
    borderRadius: 24,
    padding: 20,
    marginRight: 15,
    justifyContent: 'center',
    elevation: 4
  },

  carouselTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 10
  },

  carouselSub: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 10
  },

  gridItem: {
    width: '23%',
    alignItems: 'center',
    marginBottom: 20
  },

  gridIcon: {
    width: 55,
    height: 55,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8
  },

  gridLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#555'
  },

  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 18,
    marginBottom: 10,
    elevation: 2
  },

  accordionTitle: {
    fontWeight: '700',
    color: '#333'
  },

  accordionContent: {
    backgroundColor: '#f0f0ff',
    padding: 18,
    borderRadius: 18,
    marginBottom: 15
  },

  accordionText: {
    color: '#666',
    lineHeight: 20,
    fontSize: 14
  },

  premiumCard: {
    backgroundColor: '#1a1a1a',
    borderColor: '#333'
  },

  premiumHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15
  },

  premiumTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800'
  },

  premiumTag: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8
  },

  premiumTagText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#000'
  },

  price: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 20
  },

  month: {
    fontSize: 14,
    color: '#999',
    fontWeight: '400'
  },

  premiumBenefit: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 10
  },

  premiumButton: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 18,
    alignItems: 'center',
    marginTop: 15
  },

  premiumButtonText: {
    color: '#000',
    fontWeight: '800',
    fontSize: 16
  },

  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20
  },

  chip: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
    marginRight: 10,
    marginBottom: 10,
    elevation: 2
  },

  activeChip: {
    backgroundColor: '#5f5cff'
  },

  chipText: {
    color: '#666',
    fontWeight: '700'
  },

  activeChipText: {
    color: '#fff'
  },

  // DOCS WIDGETS STYLES
  deviceInfo: {
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#333',
    flexDirection: 'row',
    alignItems: 'center'
  },

  deviceText: {
    color: '#4CAF50',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace'
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end'
  },

  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
    maxHeight: '80%'
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#333'
  },

  notifItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0'
  },

  notifIcon: {
    width: 45,
    height: 45,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15
  },

  notifTitle: {
    fontWeight: '700',
    color: '#333',
    fontSize: 15
  },

  notifSub: {
    color: '#999',
    fontSize: 13,
    marginTop: 2
  },

  // CALENDAR STYLES
  calendarCard: {
    padding: 15
  },

  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15
  },

  calendarMonth: {
    fontSize: 16,
    fontWeight: '800',
    color: '#333'
  },

  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },

  dayLabel: {
    width: '14%',
    textAlign: 'center',
    fontSize: 12,
    color: '#999',
    fontWeight: '700',
    marginBottom: 10
  },

  dateBox: {
    width: '14%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginBottom: 5
  },

  activeDate: {
    backgroundColor: '#5f5cff'
  },

  dateText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555'
  },

  activeDateText: {
    color: '#fff',
    fontWeight: '800'
  },

  // TASKS STYLES
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15
  },

  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#5f5cff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15
  },

  checkboxDone: {
    backgroundColor: '#5f5cff'
  },

  taskText: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500'
  },

  taskDoneText: {
    textDecorationLine: 'line-through',
    color: '#BBB'
  },

  // CREDIT CARD STYLES
  creditCard: {
    backgroundColor: '#3f37c9',
    height: 190,
    justifyContent: 'space-between',
    padding: 25,
    borderWidth: 0
  },

  cardBrand: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 14,
    letterSpacing: 2
  },

  cardNum: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 3,
    marginVertical: 10
  },

  cardLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 10,
    fontWeight: '600'
  },

  cardVal: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700'
  },

  // MUSIC PLAYER STYLES
  musicPlayer: {
    padding: 15
  },

  musicThumb: {
    width: 60,
    height: 60,
    backgroundColor: '#5f5cff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },

  musicTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333'
  },

  musicArtist: {
    fontSize: 13,
    color: '#999'
  },

  progressBarBg: {
    height: 4,
    backgroundColor: '#F0F0F0',
    borderRadius: 2,
    marginTop: 15
  },

  progressBarFill: {
    height: '100%',
    backgroundColor: '#5f5cff',
    borderRadius: 2
  },

  playBtn: {
    backgroundColor: '#5f5cff',
    width: 55,
    height: 55,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30,
    elevation: 5
  }

})