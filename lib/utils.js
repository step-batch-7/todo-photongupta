const allReplace = function(content, replacement) {
  let newContent = content;
  for (const target in replacement) {
    const replacer = replacement[target];
    newContent = newContent.split(target).join(replacer);
  }
  return newContent;
};

module.exports = {allReplace};
