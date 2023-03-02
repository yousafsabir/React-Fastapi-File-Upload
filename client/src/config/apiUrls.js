const base = import.meta.env.VITE_API_URL;
const fileApis = base + "files/";

const Apis = Object.freeze({
  files: {
    save: fileApis + "save",
  },
});

export default Apis
