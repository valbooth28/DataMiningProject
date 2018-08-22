var totalSongDanceCount = 584;
var totalSongNotDanceCount = 1054;
var audioFeatureNames = ['acousticness',  'danceability', 'energy',  'instrumentalness',  'key',  'liveness',  'mode',  'speechiness',  'tempo',  'valence'];

var audioFeatureMap = 
{
  'acousticness': {
    'mean':       [0.1432  , 0.0696],
    'std':  [0.1897  , 0.1269],
  },
  'danceability': {
    'mean':       [0.6329 ,  0.6969],
    'std': [0.1483 ,  0.1199],
  },
  'energy': {
    'mean':       [0.6978  , 0.7838],
    'std':  [0.1654 ,  0.1348],
  },
  'instrumentalness': {
    'mean':       [0.0172  , 0.1116],
    'std':  [0.0925 ,  0.2457],
  },
  'key': {
     '0': [112, 52],
     '1': [128, 73],
     '10': [58, 37],
     '11': [89, 61],
     '2': [91, 33],
     '3': [33, 16],
     '4': [70, 35],
     '5': [88, 52],
     '6': [86, 49],
     '7': [117, 70],
     '8': [97, 50],
     '9': [85, 56],
     'total': [1054 , 584],
  },
  'liveness': {
    'mean':       [0.1857 ,  0.1984],
    'std':  [ 0.1465 ,  0.1676],
  },
  'mode': {
     '0': [1367 , 265],
     '1': [677 , 309],
     'total': [1044 , 574],
  },
  'speechiness': {
    'mean':        [0.0966 , 0.0778],
    'std':   [0.0939,  0.0676],
  },
  'tempo': {
    'mean':      [120.5239, 124.6424],
    'std': [ 28.6518,  17.3066],
  },
  'valence': {
    'mean':      [0.5301 ,  0.6315],
    'std': [0.2216 ,  0.2235],
  }
};