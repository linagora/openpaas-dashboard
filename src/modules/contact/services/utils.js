export function getMultiValue(vcard, propName, supportedTypes) {
  const props = vcard.getAllProperties(propName);

  return props.map(prop => {
    const data = {
      value: prop.getFirstValue()
    };

    const type = _getSuitableType(prop.getParameter("type"), supportedTypes);

    if (type) {
      data.type = type;
    }

    return data;
  });
}

function _getSuitableType(types, supportedTypes) {
  if (!types) {
    return types;
  }

  if (!Array.isArray(types)) {
    types = [types];
  }

  if (!supportedTypes) {
    return types[0];
  }

  const suitableTypes = types.filter(type =>
    supportedTypes.some(supportedType => _equalCaseInsensitive(supportedType, type))
  );

  if (suitableTypes.length) {
    return suitableTypes[0];
  }

  return "Other";
}

function _equalCaseInsensitive(str1, str2) {
  return str1.toUpperCase() === str2.toUpperCase();
}
