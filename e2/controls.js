// Training set
var data =
    [{person: 'Homer', hairLength: "NN", weight: "NN", age: "NN", sex: 'NN'},
     {person: 'Marge', hairLength: "P", weight: "NN", age: "NN", sex: 'NN'},
     {person: 'Bart', hairLength: "P", weight: "PP", age: "P", sex: 'P'},
     {person: 'Lisa', hairLength: "PP", weight: "P", age: "P", sex: 'P'},
     {person: 'Maggie', hairLength: "NN", weight: "PP", age: "P", sex: 'NN'},
     {person: 'Abe', hairLength: "PP", weight: "PP", age: "PP", sex: 'PP'}
     // {person: 'Selma', hairLength: 8, weight: 160, age: 41, sex: 'female'},
     // {person: 'Otto', hairLength: 10, weight: 180, age: 38, sex: 'male'},
     // {person: 'Krusty', hairLength: 6, weight: 200, age: 45, sex: 'male'}
   ];

// Configuration
var config = {
    trainingSet: data,
    categoryAttr: 'sex',
    ignoredAttributes: ['person']
};

// Building Decision Tree
var decisionTree = new dt.DecisionTree(config);

// Building Random Forest
var numberOfTrees = 3;
var randomForest = new dt.RandomForest(config, numberOfTrees);

// Testing Decision Tree and Random Forest
var comic = {person: 'Comic guy', hairLength: 8, weight: 290, age: 38};

var decisionTreePrediction = decisionTree.predict(comic);
var randomForestPrediction = randomForest.predict(comic);

// Displaying predictions
document.getElementById('testingItem').innerHTML = JSON.stringify(comic, null, 0);
document.getElementById('decisionTreePrediction').innerHTML = JSON.stringify(decisionTreePrediction, null, 0);
document.getElementById('randomForestPrediction').innerHTML = JSON.stringify(randomForestPrediction, null, 0);

// Displaying Decision Tree
document.getElementById('displayTree').innerHTML = treeToHtml(decisionTree.root);


// Recursive (DFS) function for displaying inner structure of decision tree
function treeToHtml(tree) {
    // only leafs containing category
    if (tree.category) {
        return  ['<ul>',
                    '<li>',
                        '<a href="#">',
                            '<b>', tree.category, '</b>',
                        '</a>',
                    '</li>',
                 '</ul>'].join('');
    }

    return  ['<ul>',
                '<li>',
                    '<a href="#">',
                        '<b>', tree.attribute, ' ', tree.predicateName, ' ', tree.pivot, ' ?</b>',
                    '</a>',
                    '<ul>',
                        '<li>',
                            '<a href="#">yes</a>',
                            treeToHtml(tree.match),
                        '</li>',
                        '<li>',
                            '<a href="#">no</a>',
                            treeToHtml(tree.notMatch),
                        '</li>',
                    '</ul>',
                '</li>',
             '</ul>'].join('');
}
