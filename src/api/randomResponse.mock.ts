import { Photo } from "./types";

export const randomResponseMock: Photo = {
  id: "id1",
  created_at: "2022-02-07T13:30:32-05:00",
  updated_at: "2022-02-19T23:28:18-05:00",
  promoted_at: "2022-02-08T02:08:01-05:00",
  width: 2530,
  height: 3162,
  color: "#d9d9d9",
  blur_hash: "blur_hash",
  description: null,
  alt_description: 'alt_desc',
  urls: {
    raw: "raw_url",
    full: "full_url",
    regular:
      "regular_url",
    small:
      "small_url",
    thumb:
      "thumb_url",
  },
  links: {
    self: "self_link",
    html: "html_link",
    download:
      "download_link",
    download_location:
      "download_loc",
  },
  likes: 44,
};
