export type Success<ok> = {
  readonly kind: 'success';
  readonly value: ok;
};

export const pass = <ok>(ok: ok): Success<ok> => ({
  kind: 'success',
  value: ok,
});
