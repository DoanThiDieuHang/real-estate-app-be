import pandas
from sklearn.metrics.pairwise import linear_kernel
from sklearn.feature_extraction.text import TfidfVectorizer
import pandas


class content_base_function():
    def __init__(self):
        self.estate_cols = ['_id','type','price']

    def get_dataframe_estates(self, text):
        estates = pandas.DataFrame(text)
        return estates[self.estate_cols]

    def tfidf_matrix(self, estates):
        selected_columns = estates[self.estate_cols]
        tf = TfidfVectorizer(analyzer='word', ngram_range=(1, 1), min_df=0)
        normalized_columns = tf.fit_transform(selected_columns.apply(
            lambda x: ' '.join(x.dropna().astype(str)), axis=1))
        return normalized_columns

    def cosine_sim(matrix):
        new_cosine_sim = linear_kernel(matrix, matrix)
        return new_cosine_sim
