function normalcdf(Z, M, SD){   //HASTINGS.  MAX ERROR = .000001
    var X = (Z-M)/SD
    var T=1/(1+.2316419*Math.abs(X));
    var D=.3989423*Math.exp(-X*X/2);
    var Prob=D*T*(.3193815+T*(-.3565638+T*(1.781478+T*(-1.821256+T*1.330274))));
    if (X>0) {
        Prob=1-Prob
    }
    return Prob
} 


function audioProbabilities(audioFeatures){
    var probFalse = 1;
    var probTrue = 1;
    var audioProbData = {};
    audioProbData.audioProbs = {};
    var audioProbs = audioProbData.audioProbs;
    _.each(audioFeatureNames, function(name){
        var songData = audioFeatures[name];
        var newTrue 
        var newFalse;
        switch(name){
            //As these were ordinal/nomial values, we're using the "percentage of each classification from the 
            //original data set" part of naive bayes
            case 'key':
            case 'mode':
                var probData = audioFeatureMap[name][songData];
                newTrue = probFalse*(probData[0]/audioFeatureMap[name].total[0]);
                newFalse = probTrue* (probData[1]/audioFeatureMap[name].total[1]);
                probFalse = probFalse* newFalse;
                probTrue = newTrue*probTrue;
                break;
            default:
                //As ratio values, we need to compute the cdf
                var statData = audioFeatureMap[name];
                
                var meanFalse = statData['mean'][0];
                var meanTrue = statData['mean'][1];
                
                var stdFalse = statData['std'][0];
                var stdTrue = statData['std'][1];

                newFalse = normalcdf(songData, meanFalse, stdFalse);
                newTrue = normalcdf(songData, meanTrue, stdTrue);
                
                probFalse = probFalse*newFalse;
                probTrue = probTrue*newTrue;
                break;
        }
        audioProbs[name] = [newFalse, newTrue];
    });
    audioProbData.finalResults = [probFalse, probTrue];
    return audioProbData;
}

function computeDanceable(song){
    var innerProbs = {};
    var audioFeatures = song.enInfo;
    console.log("Song " + song.name);
    var probTrue;
    var probFalse;
    var genreCountDance = 0;
    var genreCountNotDance = 0;
    var genres = song.genres;
    _.each(genres, function(genre){
        //How many other songs of this genre havve been danceable?
        if(genre in genreMap){
            var genreInfo = genreMap[genre];
            genreCountNotDance += genreInfo[0];
            genreCountDance += genreInfo[1];
        }
    });
    probFalse = (genreCountNotDance/totalGenreNotDanceCount);
    probTrue =  (genreCountDance/totalGenreDanceCount);
    innerProbs.genreProbs = [probFalse, probTrue];
    
    var audioProbData = audioProbabilities(audioFeatures);
    var audioProbs = audioProbData.audioProbs;
    for (var property in audioProbs) {
        if (audioProbs.hasOwnProperty(property)) {
            innerProbs[property] = audioProbs[property];
        }
    }
    var audioProbResults = audioProbData.finalResults;
    
    probFalse = probFalse * audioProbResults[0];
    probTrue = probTrue * audioProbResults[1];
    var result = probTrue > probFalse ? 1 : 0;
    var data = {
        isDanceable : result,
        probTrue: probTrue,
        probFalse : probFalse,
        innerProbs : innerProbs,
    };
    return data;
}