const DecisionTree = require('./dt.js');

class DataHandler {
    config = {};
    csvContent = "";
    data = {};
    attributes = [];
    dt;
    defaultTable;

    splitData(ratio = 3) {
        let trainData = [];
        let testData = [];
        let i = 0;

        for (let d of this.data) {
            if (i >= ratio) {
                i -= ratio;
                testData.push(d);
            } else {
                trainData.push(d);
                i++;
            }
        }
        return [trainData, testData];
    }

    predictObj(obj) {
        let dataWithoutLabel = Object.assign({}, obj);
        delete dataWithoutLabel[this.config.categoryAttr];
        return (this.dt.predict(dataWithoutLabel) == obj[this.config.categoryAttr]);
    }

    checkAccuracy() {
        let correct = 0;
        let testData = this.getSplitData()[1];
        for (let d of testData) {
            if (this.predictObj(d)) {
                correct++;
            } else {

            }
        }
        document.getElementById('accuracy').innerText = `${correct / testData.length * 100}% accuracy`;
    }

    updateAttributes() {
        let table = document.querySelector("#attributes-table tbody");
        table.innerHTML = this.defaultTable;

        for (let attribute of this.attributes) {
            let row = document.createElement('tr');

            let radioBtnCell = document.createElement('td');
            let radioBtn = document.createElement('input');
            radioBtn.type = 'radio';
            radioBtn.name = 'target_attribute';
            radioBtn.value = attribute;
            radioBtnCell.appendChild(radioBtn);
            radioBtnCell.style.textAlign = 'center';
            row.appendChild(radioBtnCell);

            let checkmarkCell = document.createElement('td');
            let checkMarkBtn = document.createElement('input');
            checkMarkBtn.type = 'checkbox';
            checkMarkBtn.name = 'ignored_attribute';
            checkMarkBtn.value = attribute;
            checkmarkCell.appendChild(checkMarkBtn);
            checkmarkCell.style.textAlign = 'center';
            row.appendChild(checkmarkCell);

            let attributeCell = document.createElement('td');
            attributeCell.innerText = attribute;
            row.appendChild(attributeCell);

            let valueCell = document.createElement('td');
            valueCell.innerText = this.data[1][attribute];
            row.appendChild(valueCell);

            table.appendChild(row);
        }
    }

    handleData(data) {
        this.csvContent = data;
        this.data = Papa.parse(data, { header: true, dynamicTyping: true }).data;
        this.data.sort(() => Math.random() - 0.5);
        this.attributes = Object.keys(this.data[1]);
        document.getElementById('hidden').style.display = 'block';
        console.log(this.attributes);
        this.updateAttributes();
    }

    getSplitData() {
        let ratioLeft = document.getElementById('data-ratio').value;
        let ratioRight = 100 - ratioLeft;
        let ratio = ratioLeft / ratioRight;
        return this.splitData(ratio);
    }

    train() {
        this.updateConfig();
        this.dt = new DecisionTree(this.config);
        console.log(this.dt);
    }

    test() {
        this.updateConfig();
        this.checkAccuracy();
    }

    download() {
        var element = document.createElement('a');
        let treeJSON = JSON.stringify(this.dt.root);
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(treeJSON));
        element.setAttribute('download', "model.json");
        console.log(treeJSON)
        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();
    }
    
    uploadModel(data) {
        let root = data;
        this.dt = new DecisionTree({}, false);
        this.dt.root = root;
    }

    upload() {
        let file = document.getElementById('tree-file').files[0];
        const reader = new FileReader();
        let self = this;
        reader.addEventListener('load', (event) => {
            let root = JSON.parse(event.target.result);
            self.dt = new DecisionTree({}, false);
            self.dt.root = root;
        });
        reader.readAsText(file);
    }

    getUrl(url) {
        document.getElementById('csv-preview-container').style.display = 'block';
        fetch(url)
            .then(response => response.text())
            .then(data => document.getElementById('csv-preview').innerText = data)
            .then(data => this.handleData(data))
    }

    init() {
        this.defaultTable = document.querySelector("#attributes-table tbody").innerHTML;
    }
}

module.exports = DataHandler
