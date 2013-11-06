var ShowdownAutolink = function(converter) {
    return [{ 
        type: 'output', 
        filter: function(source){    
            return source.replace(/https?\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!]/g, function(wholeMatch,matchIndex){
                var left = source.slice(0, matchIndex), right = source.slice(matchIndex)
                if (left.match(/<[^>]+$/) && right.match(/^[^>]*>/)) {return wholeMatch}
                return "<a href='" + wholeMatch + "'>" + wholeMatch + "</a>";
            });
        }
    }];
};

Showdown.extensions['autolink'] = ShowdownAutolink;
