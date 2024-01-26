import axios from "axios";

export const getStrapiContentByPosition = async (position: string) => {
  try {
    const response = await axios.get(
      `https://neoncheese-static-api-skixf.ondigitalocean.app/api/special-offers?populate=*&sort=id:asc&filters[position][$eq]=${position}`,
      {
        headers: {
          Authorization: `Bearer `,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getPageStaticStrings = async (route: string) => {
  try {
    const response = await axios.get(
      `https://neoncheese-static-api-skixf.ondigitalocean.app/api/page-static-strings?populate=*&filters[route][$eq]=${route}`,
      {
        headers: {
          Authorization: `Bearer fea663c30c1495876d58f7632207e83d2dcebf4075b808cd80313ae9df5c0ab6af6f0f31c18710d6ab42dbf1bf0e00cbf318d159bc0e0340e2d95b0c10f53cf6e4c8c5215e1a7bb28bdd13425362e14e1c6a02d43406f17a85925509cfe933cbbb30a52512784bf38735d48259e1ece7326d8c402e2e39bd5c7801c2a45cece2`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getArticlesFromStrapi = async () => {
  try {
    const response = await axios.get(
      `https://neoncheese-static-api-skixf.ondigitalocean.app/api/articles?populate=*&sort=createdAt:desc`,
      {
        headers: {
          Authorization: `Bearer fea663c30c1495876d58f7632207e83d2dcebf4075b808cd80313ae9df5c0ab6af6f0f31c18710d6ab42dbf1bf0e00cbf318d159bc0e0340e2d95b0c10f53cf6e4c8c5215e1a7bb28bdd13425362e14e1c6a02d43406f17a85925509cfe933cbbb30a52512784bf38735d48259e1ece7326d8c402e2e39bd5c7801c2a45cece2`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const strapiGetArticleBySlug = async (slug: string) => {
  try {
    const response = await axios.get(
      `https://neoncheese-static-api-skixf.ondigitalocean.app/api/articles?populate=*&filters[slug][$eq]=${slug}`,
      {
        headers: {
          Authorization: `Bearer fea663c30c1495876d58f7632207e83d2dcebf4075b808cd80313ae9df5c0ab6af6f0f31c18710d6ab42dbf1bf0e00cbf318d159bc0e0340e2d95b0c10f53cf6e4c8c5215e1a7bb28bdd13425362e14e1c6a02d43406f17a85925509cfe933cbbb30a52512784bf38735d48259e1ece7326d8c402e2e39bd5c7801c2a45cece2`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getFaqItemsFromStrapi = async () => {
  try {
    const response = await axios.get(
      `https://neoncheese-static-api-skixf.ondigitalocean.app/api/questions?sort=id:asc`,
      {
        headers: {
          Authorization: `Bearer fea663c30c1495876d58f7632207e83d2dcebf4075b808cd80313ae9df5c0ab6af6f0f31c18710d6ab42dbf1bf0e00cbf318d159bc0e0340e2d95b0c10f53cf6e4c8c5215e1a7bb28bdd13425362e14e1c6a02d43406f17a85925509cfe933cbbb30a52512784bf38735d48259e1ece7326d8c402e2e39bd5c7801c2a45cece2`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};
