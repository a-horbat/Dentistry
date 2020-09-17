import React from 'react';
import Image from 'material-ui-image';
import Skeleton from '@material-ui/lab/Skeleton';

const ProductImage = ({ src, style }) => {
  return (src || '').toLowerCase().includes('.pdf') ? (
    <object
      data={src}
      type='application/pdf'
      height={style && style.height}
      style={{
        objectFit: 'cover',
        padding: 0,
        ...style
      }}
    />
  ) : (
    <Image
      src={src}
      style={{
        padding: 0,
        ...style,
      }}
      imageStyle={{
        objectFit: "cover",
        objectPosition: "top"
      }}
      loading={
        <Skeleton
          variant="rect"
          height={style && style.height}
          width={style && style.width}
        />
      }
      alt="Invoice"
    />
  );
};

export default ProductImage;
