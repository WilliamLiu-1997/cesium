import defined from "../../Core/defined.js";
import BatchTexture from "../BatchTexture.js";

export default function ModelFeatureTable(model, featureTable) {
  var featuresLength = featureTable.count;

  this.featuresLength = featuresLength;
  this.featureTable = featureTable;
  this.model = model;

  var content = model._content;
  this.content = content;

  this._features = undefined;
  this._batchTexture = new BatchTexture({
    featuresLength: featuresLength,
    content: defined(content) ? content : model,
  });
}

ModelFeatureTable.prototype.getPickColor = function (featureId) {
  return this._batchTexture.setColor(featureId);
};

ModelFeatureTable.prototype.setColor = function (featureId, color) {
  this._batchTexture.setColor(featureId, color);
};

ModelFeatureTable.prototype.getColor = function (featureId, result) {
  return this._batchTexture.getColor(featureId, result);
};

ModelFeatureTable.prototype.update = function (frameState) {
  this._batchTexture.update(this.content._tileset, frameState);
};

ModelFeatureTable.prototype.getProperty = function (featureId, name) {
  if (defined(this.featureTable._metadataTable)) {
    var metadataTable = this.featureTable._metadataTable;
    if (metadataTable.hasProperty(name)) {
      return metadataTable.getProperty(featureId, name);
    }
  }
  return undefined;
};
