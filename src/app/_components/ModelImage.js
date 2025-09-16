import Image from "next/image";

function ModelImage({ model }) {
  console.log(model, "EL MODELO");
  if (!model?.image_url) return null;
  return (
    <Image
      className="rounded-xl"
      width={120}
      height={120}
      alt={model.nombre_modelo}
      src={model.image_url}
    ></Image>
  );
}

export default ModelImage;
