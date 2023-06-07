import pandas
from pandas import read_csv
from sklearn.metrics.pairwise import linear_kernel
from sklearn.feature_extraction.text import TfidfVectorizer
import pandas
from pandas import isnull, notnull


class content_base_function():
    def __init__(self):
        self.estate_cols = ['_id', 'address', 'area',
                            'bathRoom', 'bedRoom', 'name', 'price', 'type']

    def get_dataframe_estates(self, text):
        """
        đọc file csv của estates.csv, lưu thành dataframe với 3 cột user id, name, type
        """
        estates = pandas.DataFrame(text)
        return estates[self.estate_cols]

    def tfidf_matrix(self, estates):
        """
                Dùng hàm "TfidfVectorizer" để chuẩn hóa "type" với:
                + analyzer='word': chọn đơn vị trích xuất là word
                + ngram_range=(1, 1): mỗi lần trích xuất 1 word
                + min_df=0: tỉ lệ word không đọc được là 0
                Lúc này ma trận trả về với số dòng tương ứng với số lượng film và số cột tương ứng với số từ được tách ra từ "genres"
        """

        # Normalize each selected column using TF-IDF
        selected_columns = estates[self.estate_cols]
        tf = TfidfVectorizer(analyzer='word', ngram_range=(1, 1), min_df=0)
        normalized_columns = tf.fit_transform(selected_columns.apply(
            lambda x: ' '.join(x.dropna().astype(str)), axis=1))
        return normalized_columns

    def cosine_sim(matrix):
        """
                        Dùng hàm "linear_kernel" để tạo thành ma trận hình vuông với số hàng và số cột là số lượng film
                        để tính toán điểm tương đồng giữa từng bộ phim với nhau
        """

        # Compute cosine similarity using linear_kernel for the normalized columns
        new_cosine_sim = linear_kernel(matrix, matrix)
        return new_cosine_sim
