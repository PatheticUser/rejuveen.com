import type {Variant} from '~/types/cart';
import {isoWindow} from '~/utils/window';

import {getHostname} from './hostname';

export interface ConstructCheckoutLinkProps {
  channel?: string;
  paymentOption?: string;
  sourceToken?: string;
  source?: string;
  storeUrl?: string;
  variants?: string;
}

export function constructCheckoutLink({
  channel,
  paymentOption,
  source,
  sourceToken,
  storeUrl,
  variants,
}: ConstructCheckoutLinkProps): string {
  const hostname = getHostname(storeUrl);

  if (!hostname) return '#';

  let url = new isoWindow.URL(`https://${hostname}/checkout`);

  if (variants) {
    const variantsCollection: Variant[] = variants.split(',').map((variant) => {
      const [id, stringQuantity] = variant.split(':');
      const quantity = stringQuantity ? Number(stringQuantity) : 1;
      return {id: Number(id), quantity: isNaN(quantity) ? 1 : quantity};
    });

    const variantsString = variantsCollection
      .map((variant) => `${variant.id}:${variant.quantity}`)
      .join(',');

    url = new isoWindow.URL(`https://${hostname}/cart/${variantsString}`);
  }

  const params = new URLSearchParams(url.search);

  params.append('payment', paymentOption || 'shop_pay');

  if (source) {
    params.append('source', source);
  }

  if (sourceToken) {
    params.append('source_token', sourceToken);
  }

  if (channel) {
    params.append('channel', channel);
  }

  return `${url.href}?${params}`;
}
