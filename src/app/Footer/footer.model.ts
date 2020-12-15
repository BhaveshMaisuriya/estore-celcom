export interface CompliantFormat {
  icon: string;
  url: string;
  text: string;
}
export type CompliantType = CompliantFormat;
export interface PostPaidAppItemsFormat {
  title: string;
  icon: string;
  url: string;
}
export interface AppItemsFormat {
  absolute: string;
  alias: string;
  external: string;
  uri: string;
  title: string;
}
export type AppItemsType = AppItemsFormat;

export interface PostPaidAppFormat {
  title: string;
  items: PostPaidAppItemsFormat[];
}
export type PostPaidAppType = PostPaidAppFormat;
