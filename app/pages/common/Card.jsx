import Links from '~/pages/common/Links';

export default function Card(props) {
  const { title, description, mediaUrl, mediaType, links, size } = props;
  const height = size === 'sm' ? 44 : 96;

  return (
    <div
      className={`h-${height} w-1/3 max-w-xs p-4 mx-4 basis-full shadow-lg rounded-md flex flex-col`}
    >
      {mediaType === 'video' && (
        <iframe
          className="w-full h-1/2 object-cover rounded"
          title={title}
          src={mediaUrl}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
      {mediaType === 'image' && (
        <img className="w-full h-1/2 object-cover rounded" src={mediaUrl} />
      )}
      <h1 className="font-mono font-medium text-lg text-center py-2">
        {title}
      </h1>
      <p className="">{description}</p>
      <Links
        links={links}
        iconSize="xl"
        containerStyles="justify-end mt-auto"
      />
    </div>
  );
}
