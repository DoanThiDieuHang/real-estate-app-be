import pandas as pd
import function_package
import sys
import json
import collaborative_filter


class ContentBased(object):
    """
        Khởi tại dataframe "estates" với hàm "get_dataframe_estates_csv"
    """

    def __init__(self, estates):
        self.estates_json = estates
        self.estates = function_package.content_base_function().get_dataframe_estates(
            estates)
        self.tfidf_matrix = None
        self.cosine_sim = None
        self.estate_cols = ['_id', 'address', 'area',
                            'bathRoom', 'bedRoom', 'name', 'price', 'type']

    def build_model(self):
        """
            Tách các giá trị của type ở từng estate đang được ngăn cách bởi '|'
        """
        self.tfidf_matrix = function_package.content_base_function().tfidf_matrix(
            self.estates)
        self.cosine_sim = function_package.content_base_function.cosine_sim(
            self.tfidf_matrix)

    def refresh(self):
        """
             Chuẩn hóa dữ liệu và tính toán lại ma trận
        """
        self.build_model()

    def item_recommendations(self, array_item):
        """
            Xây dựng hàm trả về danh sách top film tương đồng theo tên film truyền vào:
            + Tham số truyền vào gồm "title" là tên film và "topX" là top film tương đồng cần lấy
            + Tạo ra list "sim_score" là danh sách điểm tương đồng với film truyền vào
            + Sắp xếp điểm tương đồng từ cao đến thấp
            + Trả về top danh sách tương đồng cao nhất theo giá trị "topX" truyền vào
        """
        """
    Return a list of top similar items based on the given item name across all columns.
    Parameters:
    - name: The name of the item for which recommendations are requested.
    - top_x: The number of top similar items to return.
    Returns:
    - A tuple containing the list of similar item scores and the corresponding item titles.
    """
        indices = pd.Series(self.estates.index, index=self.estates[self.estate_cols].astype(
            str).apply(lambda x: ' '.join(x), axis=1))
        sim_scores_results = []
        for item in array_item:
            item_str = ''.join(map(str, item))
            idx = indices[item_str]
            sim_scores = list(enumerate(self.cosine_sim[idx]))
            sim_scores = [i for i in sim_scores if i[0] != idx]
            sim_scores_results.extend(sim_scores)
        sim_scores_results = sorted(
            sim_scores_results, key=lambda x: x[1], reverse=True)

        unique_result = set()
        unique_sim_scores_results = [
            item for item in sim_scores_results if item[0] not in unique_result and not unique_result.add(item[0])]
        estates_scores_results = [{'estate': self.estates_json[estate[0]], 'score': estate[1]}
                                  for estate in unique_sim_scores_results]
        return estates_scores_results

    def adjust_scores_with_collaborative_filtering(self, cb_estates_scores, cf_recommendations, top_x):
        adjusted_scores = []
        for estate_score in cb_estates_scores:
            estate_id = estate_score['estate']['_id']
            content_score = estate_score['score']

            adjusted_score = content_score + \
                cf_recommendations.get(estate_id, 0)
            adjusted_scores.append(
                {'estate': estate_score['estate'], 'score': adjusted_score})

        adjusted_scores.sort(key=lambda item: item['score'], reverse=True)

        return adjusted_scores[:top_x]


if __name__ == '__main__':
    # Collaborative filter
    list_estates_users = json.loads(sys.argv[1])
    user_id = sys.argv[2]
    top_recommendations = int(sys.argv[3])
    # Content-based
    list_estates = json.loads(sys.argv[4])
    item_names = json.loads(sys.argv[5])
    estates_recommend_for_user = []
    if list_estates_users != [] and item_names != []:
        cf = collaborative_filter.Collaborative_filtering(list_estates_users)
        cf.refresh()
        cf_recommend_estate = cf.generate_recommendations(
            user_id)
        cb = ContentBased(list_estates)
        cb.refresh()
        item_df = function_package.content_base_function().get_dataframe_estates(
            item_names)
        estate_cols = ['_id', 'address', 'area',
                       'bathRoom', 'bedRoom', 'name', 'price', 'type']
        item_name_recommend = item_df[estate_cols].astype(
            str).apply(' '.join, axis=1).tolist()
        cb_recommended_estate = cb.item_recommendations(
            item_name_recommend)
        estates_recommend_for_user = cb.adjust_scores_with_collaborative_filtering(
            cb_recommended_estate, cf_recommend_estate, top_recommendations)

    print(json.dumps([item['estate']
          for item in estates_recommend_for_user] if len(estates_recommend_for_user) != 0 else [], ensure_ascii=False))
