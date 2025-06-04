import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { JSX, useEffect, useState } from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const WORD_LENGTH = 5;
const MAX_ATTEMPTS = 6;
const SCREEN_WIDTH = Dimensions.get('window').width;
const CELL_SIZE = (SCREEN_WIDTH - 40) / WORD_LENGTH - 5;

// Placeholder word list - you'll replace this with your larger dictionary
export const WORD_LIST: string[] = [
  'ABOUT', 'ABOVE', 'ABUSE', 'ACTOR', 'ACUTE', 'ADMIT', 'ADOPT', 'ADULT', 'AFTER', 'AGAIN',
  'AGENT', 'AGREE', 'AHEAD', 'ALARM', 'ALBUM', 'ALERT', 'ALIEN', 'ALIGN', 'ALIKE', 'ALIVE',
  'ALLOW', 'ALONE', 'ALONG', 'ALTER', 'AMONG', 'ANGER', 'ANGLE', 'ANGRY', 'APART', 'APPLE',
  'APPLY', 'ARENA', 'ARGUE', 'ARISE', 'ARRAY', 'ASIDE', 'ASSET', 'AUDIO', 'AUDIT', 'AVOID',
  'AWAKE', 'AWARD', 'AWARE', 'BADLY', 'BAKER', 'BASES', 'BASIC', 'BEACH', 'BEGAN', 'BEGIN',
  'BEING', 'BELOW', 'BENCH', 'BILLY', 'BIRTH', 'BLACK', 'BLAME', 'BLANK', 'BLAST', 'BLIND',
  'BLOCK', 'BLOOD', 'BOARD', 'BOAST', 'BOBBY', 'BOOST', 'BOOTH', 'BOUND', 'BRAIN', 'BRAND',
  'BRASS', 'BRAVE', 'BREAD', 'BREAK', 'BREED', 'BRIEF', 'BRING', 'BROAD', 'BROKE', 'BROWN',
  'BUILD', 'BUILT', 'BUYER', 'CABLE', 'CALIF', 'CARRY', 'CATCH', 'CAUSE', 'CHAIN', 'CHAIR',
  'CHAOS', 'CHARM', 'CHART', 'CHASE', 'CHEAP', 'CHECK', 'CHEST', 'CHIEF', 'CHILD', 'CHINA',
  'CHOSE', 'CIVIL', 'CLAIM', 'CLASS', 'CLEAN', 'CLEAR', 'CLICK', 'CLIMB', 'CLOCK', 'CLOSE',
  'CLOUD', 'COACH', 'COAST', 'COULD', 'COUNT', 'COURT', 'COVER', 'CRAFT', 'CRASH', 'CRAZY',
  'CREAM', 'CRIME', 'CROSS', 'CROWD', 'CROWN', 'CRUDE', 'CURVE', 'CYCLE', 'DAILY', 'DANCE',
  'DATED', 'DEALT', 'DEATH', 'DEBUT', 'DELAY', 'DEPTH', 'DOING', 'DOUBT', 'DOZEN', 'DRAFT',
  'DRAMA', 'DRANK', 'DRAWN', 'DREAM', 'DRESS', 'DRILL', 'DRINK', 'DRIVE', 'DROVE', 'DYING',
  'EAGER', 'EARLY', 'EARTH', 'EIGHT', 'ELITE', 'EMPTY', 'ENEMY', 'ENJOY', 'ENTER', 'ENTRY',
  'EQUAL', 'ERROR', 'EVENT', 'EVERY', 'EXACT', 'EXIST', 'EXTRA', 'FAITH', 'FALSE', 'FAULT',
  'FIBER', 'FIELD', 'FIFTH', 'FIFTY', 'FIGHT', 'FINAL', 'FIRST', 'FIXED', 'FLASH', 'FLEET',
  'FLOOR', 'FLUID', 'FOCUS', 'FORCE', 'FORTH', 'FORTY', 'FORUM', 'FOUND', 'FRAME', 'FRANK',
  'FRAUD', 'FRESH', 'FRONT', 'FRUIT', 'FULLY', 'FUNNY', 'GIANT', 'GIVEN', 'GLASS', 'GLOBE',
  'GOING', 'GRACE', 'GRADE', 'GRAND', 'GRANT', 'GRASS', 'GRAVE', 'GREAT', 'GREEN', 'GROSS',
  'GROUP', 'GROWN', 'GUARD', 'GUESS', 'GUEST', 'GUIDE', 'HAPPY', 'HARSH', 'HATED', 'HEARD',
  'HEART', 'HEAVY', 'HENCE', 'HENRY', 'HORSE', 'HOTEL', 'HOUSE', 'HUMAN', 'IDEAL', 'IMAGE',
  'INDEX', 'INNER', 'INPUT', 'ISSUE', 'JAPAN', 'JIMMY', 'JOINT', 'JONES', 'JUDGE', 'KNOWN',
  'LABEL', 'LARGE', 'LASER', 'LATER', 'LAUGH', 'LAYER', 'LEARN', 'LEASE', 'LEAST', 'LEAVE',
  'LEGAL', 'LEVEL', 'LEWIS', 'LIGHT', 'LIMIT', 'LINKS', 'LIVES', 'LOCAL', 'LOOSE', 'LOWER',
  'LUCKY', 'LUNCH', 'LYING', 'MAGIC', 'MAJOR', 'MAKER', 'MARCH', 'MARIA', 'MATCH', 'MAYBE',
  'MAYOR', 'MEANT', 'MEDIA', 'METAL', 'MIGHT', 'MINOR', 'MINUS', 'MIXED', 'MODEL', 'MONEY',
  'MONTH', 'MORAL', 'MOTOR', 'MOUNT', 'MOUSE', 'MOUTH', 'MOVED', 'MOVIE', 'MUSIC', 'NEEDS',
  'NEVER', 'NEWLY', 'NIGHT', 'NOISE', 'NORTH', 'NOTED', 'NOVEL', 'NURSE', 'OCCUR', 'OCEAN',
  'OFFER', 'OFTEN', 'ORDER', 'OTHER', 'OUGHT', 'PAINT', 'PANEL', 'PAPER', 'PARTY', 'PEACE',
  'PETER', 'PHASE', 'PHONE', 'PHOTO', 'PIANO', 'PICKED', 'PIECE', 'PILOT', 'PITCH', 'PLACE',
  'PLAIN', 'PLANE', 'PLANT', 'PLATE', 'POINT', 'POUND', 'POWER', 'PRESS', 'PRICE', 'PRIDE',
  'PRIME', 'PRINT', 'PRIOR', 'PRIZE', 'PROOF', 'PROUD', 'PROVE', 'QUEEN', 'QUICK', 'QUIET',
  'QUITE', 'RADIO', 'RAISE', 'RANGE', 'RAPID', 'RATIO', 'REACH', 'READY', 'REALM', 'REBEL',
  'REFER', 'RELAX', 'RENEW', 'REPLY', 'RIGHT', 'RIGID', 'RIVAL', 'RIVER', 'ROBIN', 'ROGER',
  'ROMAN', 'ROUGH', 'ROUND', 'ROUTE', 'ROYAL', 'RURAL', 'SCALE', 'SCENE', 'SCOPE', 'SCORE',
  'SENSE', 'SERVE', 'SETUP', 'SEVEN', 'SHALL', 'SHAPE', 'SHARE', 'SHARP', 'SHEET', 'SHELF',
  'SHELL', 'SHIFT', 'SHINE', 'SHIRT', 'SHOCK', 'SHOOT', 'SHORT', 'SHOWN', 'SIDES', 'SIGHT',
  'SIMON', 'SINCE', 'SIXTH', 'SIXTY', 'SIZED', 'SKILL', 'SLEEP', 'SLIDE', 'SMALL', 'SMART',
  'SMILE', 'SMITH', 'SMOKE', 'SOLID', 'SOLVE', 'SORRY', 'SOUND', 'SOUTH', 'SPACE', 'SPARE',
  'SPEAK', 'SPEED', 'SPEND', 'SPENT', 'SPLIT', 'SPOKE', 'SPORT', 'STAFF', 'STAGE', 'STAKE',
  'STAND', 'START', 'STATE', 'STEAM', 'STEEL', 'STEEP', 'STEER', 'STEVE', 'STICK', 'STILL',
  'STOCK', 'STONE', 'STOOD', 'STORE', 'STORM', 'STORY', 'STRIP', 'STUCK', 'STUDY', 'STUFF',
  'STYLE', 'SUGAR', 'SUITE', 'SUPER', 'SWEET', 'TABLE', 'TAKEN', 'TASTE', 'TAXES', 'TEACH',
  'TEETH', 'TERRY', 'TEXAS', 'THANK', 'THEFT', 'THEIR', 'THEME', 'THERE', 'THESE', 'THICK',
  'THING', 'THINK', 'THIRD', 'THOSE', 'THREE', 'THREW', 'THROW', 'THUMB', 'THUS', 'TIGHT',
  'TIRED', 'TISSUE', 'TITLE', 'TODAY', 'TOPIC', 'TOTAL', 'TOUCH', 'TOUGH', 'TOWER', 'TRACK',
  'TRADE', 'TRAIN', 'TREAT', 'TREND', 'TRIAL', 'TRIBE', 'TRICK', 'TRIED', 'TRIES', 'TRUCK',
  'TRULY', 'TRUNK', 'TRUST', 'TRUTH', 'TWICE', 'TWIST', 'TYLER', 'UNCLE', 'UNDUE', 'UNION',
  'UNITY', 'UNTIL', 'UPPER', 'UPSET', 'URBAN', 'USAGE', 'USUAL', 'VALUE', 'VIDEO', 'VIRUS',
  'VISIT', 'VITAL', 'VOCAL', 'VOICE', 'WASTE', 'WATCH', 'WATER', 'WHEEL', 'WHERE', 'WHICH',
  'WHILE', 'WHITE', 'WHOLE', 'WHOSE', 'WOMAN', 'WOMEN', 'WORLD', 'WORRY', 'WORSE', 'WORST',
  'WORTH', 'WOULD', 'WRITE', 'WRONG', 'WROTE', 'YIELD', 'YOUNG', 'YOUTH', 'ZERO'
];

interface Stats {
  gamesPlayed: number;
  gamesWon: number;
  currentStreak: number;
  maxStreak: number;
  guessDistribution: number[];
}

interface GameState {
  targetWord: string;
  guesses: string[];
  currentGuess: string;
  currentRow: number;
  gameOver: boolean;
  usedLetters: Record<string, LetterStatus>;
}

type LetterStatus = 'correct' | 'present' | 'absent' | 'empty';

const WordleGame: React.FC = () => {
  const [targetWord, setTargetWord] = useState<string>('');
  const [guesses, setGuesses] = useState<string[]>(Array(MAX_ATTEMPTS).fill(''));
  const [currentGuess, setCurrentGuess] = useState<string>('');
  const [currentRow, setCurrentRow] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [usedLetters, setUsedLetters] = useState<Record<string, LetterStatus>>({});
  const [animations] = useState<Animated.Value[][]>(
    Array(MAX_ATTEMPTS).fill(null).map(() => 
      Array(WORD_LENGTH).fill(null).map(() => new Animated.Value(0))
    )
  );
  const [stats, setStats] = useState<Stats>({
    gamesPlayed: 0,
    gamesWon: 0,
    currentStreak: 0,
    maxStreak: 0,
    guessDistribution: Array(MAX_ATTEMPTS).fill(0)
  });
  const [todayWord, setTodayWord] = useState<string>('');

  // Initialize game
  useEffect(() => {
    loadStats();
    initializeDailyGame();
  }, []);

  const loadStats = async (): Promise<void> => {
    try {
      const savedStats = await AsyncStorage.getItem('wordleStats');
      if (savedStats) {
        setStats(JSON.parse(savedStats) as Stats);
      }
    } catch (e) {
      console.log('Failed to load stats', e);
    }
  };

  const saveStats = async (newStats: Stats): Promise<void> => {
    try {
      await AsyncStorage.setItem('wordleStats', JSON.stringify(newStats));
    } catch (e) {
      console.log('Failed to save stats', e);
    }
  };

  const getDailyWord = (): string => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth();
    const year = today.getFullYear();
    const dayCode = day + month * 31 + year * 365;
    return WORD_LIST[dayCode % WORD_LIST.length];
  };

  const initializeDailyGame = async (): Promise<void> => {
    const dailyWord = getDailyWord();
    setTodayWord(dailyWord);
    
    try {
      const lastPlayed = await AsyncStorage.getItem('lastPlayedDate');
      const today = new Date().toDateString();
      
      if (lastPlayed !== today) {
        // New day, reset game
        await AsyncStorage.setItem('lastPlayedDate', today);
        startNewGame(dailyWord);
      } else {
        // Load existing game
        const savedGame = await AsyncStorage.getItem('currentGame');
        if (savedGame) {
          const gameState = JSON.parse(savedGame) as GameState;
          if (gameState.targetWord === dailyWord) {
            setTargetWord(gameState.targetWord);
            setGuesses(gameState.guesses);
            setCurrentGuess(gameState.currentGuess);
            setCurrentRow(gameState.currentRow);
            setGameOver(gameState.gameOver);
            setUsedLetters(gameState.usedLetters);
          } else {
            startNewGame(dailyWord);
          }
        } else {
          startNewGame(dailyWord);
        }
      }
    } catch (e) {
      console.log('Failed to initialize daily game', e);
      startNewGame(dailyWord);
    }
  };

  const saveGame = async (): Promise<void> => {
    try {
      const gameState: GameState = {
        targetWord,
        guesses,
        currentGuess,
        currentRow,
        gameOver,
        usedLetters
      };
      await AsyncStorage.setItem('currentGame', JSON.stringify(gameState));
    } catch (e) {
      console.log('Failed to save game', e);
    }
  };

  const startNewGame = (word?: string): void => {
    const newWord = word || WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)].toUpperCase();
    setTargetWord(newWord);
    setGuesses(Array(MAX_ATTEMPTS).fill(''));
    setCurrentGuess('');
    setCurrentRow(0);
    setGameOver(false);
    setUsedLetters({});
    saveGame();
  };

  const handleKeyPress = (letter: string): void => {
    if (gameOver) return;
    
    if (letter === 'ENT') {
      if (currentGuess.length === WORD_LENGTH) {
        checkGuess();
      } else {
        // Shake animation for incomplete word
        animations[currentRow].forEach(anim => {
          Animated.sequence([
            Animated.timing(anim, { toValue: -10, duration: 50, useNativeDriver: true }),
            Animated.timing(anim, { toValue: 10, duration: 50, useNativeDriver: true }),
            Animated.timing(anim, { toValue: -10, duration: 50, useNativeDriver: true }),
            Animated.timing(anim, { toValue: 0, duration: 50, useNativeDriver: true }),
          ]).start();
        });
      }
      return;
    }
    
    if (letter === 'DEL') {
      setCurrentGuess(currentGuess.slice(0, -1));
      saveGame();
      return;
    }
    
    if (currentGuess.length < WORD_LENGTH) {
      setCurrentGuess(currentGuess + letter);
      saveGame();
    }
  };

  const updateStats = (won: boolean, attemptCount?: number): void => {
    const newStats = {...stats};
    newStats.gamesPlayed += 1;
    
    if (won && attemptCount !== undefined) {
      newStats.gamesWon += 1;
      newStats.currentStreak += 1;
      newStats.maxStreak = Math.max(newStats.maxStreak, newStats.currentStreak);
      newStats.guessDistribution[attemptCount] += 1;
    } else {
      newStats.currentStreak = 0;
    }
    
    setStats(newStats);
    saveStats(newStats);
  };

  const shareResults = (): void => {
    const resultRows = guesses.slice(0, currentRow + (gameOver ? 0 : 1)).map(guess => {
      return guess.split('').map((letter, i) => {
        if (targetWord[i] === letter) return '🟩';
        if (targetWord.includes(letter)) return '🟨';
        return '⬛';
      }).join('');
    }).join('\n');

    const shareText = `Wordle ${stats.gamesPlayed} ${gameOver && guesses[currentRow - 1] === targetWord ? currentRow : 'X'}/${MAX_ATTEMPTS}\n\n${resultRows}`;
    
    Share.share({
      message: shareText,
      title: 'Check out my Wordle result!'
    });
  };

  const checkGuess = (): void => {
    const newGuesses = [...guesses];
    newGuesses[currentRow] = currentGuess;
    setGuesses(newGuesses);

    // Update used letters with their status
    const newUsedLetters = {...usedLetters};
    for (let i = 0; i < currentGuess.length; i++) {
      const letter = currentGuess[i];
      if (!newUsedLetters[letter]) {
        if (targetWord[i] === letter) {
          newUsedLetters[letter] = 'correct';
        } else if (targetWord.includes(letter)) {
          newUsedLetters[letter] = 'present';
        } else {
          newUsedLetters[letter] = 'absent';
        }
      }
    }
    setUsedLetters(newUsedLetters);

    // Animate the current row
    for (let i = 0; i < WORD_LENGTH; i++) {
      setTimeout(() => animateCell(currentRow, i), i * 300);
    }

    // Check win/lose conditions
    if (currentGuess === targetWord) {
      setTimeout(() => {
        setGameOver(true);
        updateStats(true, currentRow);
        Alert.alert('You Win!', 'Congratulations!', [
          { text: 'Share', onPress: shareResults },
          { text: 'Play Again', onPress: () => startNewGame() }
        ]);
      }, 1500);
      return;
    }

    if (currentRow === MAX_ATTEMPTS - 1) {
      setTimeout(() => {
        setGameOver(true);
        updateStats(false);
        Alert.alert('Game Over', `The word was: ${targetWord}`, [
          { text: 'Share', onPress: shareResults },
          { text: 'Try Again', onPress: () => startNewGame() }
        ]);
      }, 1500);
      return;
    }

    setCurrentGuess('');
    setCurrentRow(currentRow + 1);
    saveGame();
  };

  const animateCell = (row: number, col: number): void => {
    animations[row][col].setValue(0);
    Animated.sequence([
      Animated.timing(animations[row][col], {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const getLetterStatus = (row: number, col: number): LetterStatus => {
    if (row >= currentRow) return 'empty';
    
    const letter = guesses[row][col];
    if (targetWord[col] === letter) return 'correct';
    if (targetWord.includes(letter)) return 'present';
    return 'absent';
  };

  const getKeyColor = (key: string): string => {
    if (usedLetters[key] === 'correct') return '#6aaa64';
    if (usedLetters[key] === 'present') return '#c9b458';
    if (usedLetters[key] === 'absent') return '#787c7e';
    return '#d3d6da';
  };

  const renderCell = (row: number, col: number): JSX.Element => {
    const status = getLetterStatus(row, col);
    const letter = row < currentRow 
      ? guesses[row][col] 
      : row === currentRow ? currentGuess[col] || '' : '';
    
    const rotateY = animations[row][col].interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: ['0deg', '90deg', '0deg'],
    });

    const backgroundColor = {
      empty: '#ffffff',
      correct: '#6aaa64',
      present: '#c9b458',
      absent: '#787c7e',
    }[status];

    return (
      <Animated.View
        key={col}
        style={[
          styles.cell,
          {
            backgroundColor,
            borderColor: row === currentRow && col === currentGuess.length ? '#000' : '#d3d6da',
            transform: [{ rotateY }],
          }
        ]}
      >
        <Text style={styles.letter}>{letter}</Text>
      </Animated.View>
    );
  };

  const showStats = (): void => {
    Alert.alert(
      'Statistics',
      `Played: ${stats.gamesPlayed}\nWin %: ${stats.gamesPlayed ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100) : 0}\nCurrent Streak: ${stats.currentStreak}\nMax Streak: ${stats.maxStreak}`,
      [
        { text: 'OK' },
        { text: 'Share', onPress: shareResults }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={showStats}>
          <Text style={styles.statsIcon}>📊</Text>
        </TouchableOpacity>
        <Text style={styles.title}>WORDLE</Text>
        <TouchableOpacity onPress={() => startNewGame()}>
          <Text style={styles.statsIcon}>🔄</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.board}>
        {Array(MAX_ATTEMPTS).fill(null).map((_, row) => (
          <View key={row} style={styles.row}>
            {Array(WORD_LENGTH).fill(null).map((_, col) => renderCell(row, col))}
          </View>
        ))}
      </View>
      
      <View style={styles.keyboard}>
        {['Q W E R T Y U I O P', 'A S D F G H J K L', 'Z X C V B N M DEL ENT'].map((row, i) => (
          <View key={i} style={styles.keyboardRow}>
            {row.split(' ').map(key => (
              <TouchableOpacity 
                key={key} 
                style={[
                  styles.key, 
                  { 
                    backgroundColor: getKeyColor(key),
                    width: key.length > 1 ? CELL_SIZE * 1.5 : CELL_SIZE,
                  }
                ]}
                onPress={() => handleKeyPress(key)}
              >
                <Text style={styles.keyText}>{key}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statsIcon: {
    fontSize: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    letterSpacing: 2,
    color: '#000',
  },
  board: {
    marginBottom: 30,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderWidth: 2,
    margin: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  letter: {
    fontSize: CELL_SIZE * 0.6,
    fontWeight: 'bold',
    color: '#000',
    textTransform: 'uppercase',
  },
  keyboard: {
    width: '100%',
    paddingHorizontal: 10,
    position: 'absolute',
    bottom: 30,
  },
  keyboardRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
  },
  key: {
    height: CELL_SIZE * 0.8,
    maxWidth:CELL_SIZE*0.5,
    marginHorizontal: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  keyText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    textTransform: 'uppercase',
  },
});

export default WordleGame;