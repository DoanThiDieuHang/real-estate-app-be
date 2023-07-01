import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import json
import sys


class Collaborative_filtering(object):
    def __init__(self, users_estates_like):
        self.users_estates_like = users_estates_like
        self.users = None
        self.estateIds = None
        self.user_favorite_matrix = None
        self.similarity_matrix = None

    def refresh(self):
        self.build_model()

    def calculate_similarity(self, matrix):
        similarity_matrix = cosine_similarity(matrix)
        return similarity_matrix

    def users_estate_favourite_matrix(self):
        users = np.unique([data['user_id']
                          for data in self.users_estates_like])
        self.users = users
        items = np.unique([data['estateId']
                          for data in self.users_estates_like])
        self.estateIds = items
        user_favorite_matrix = np.zeros((len(users), len(items)))
        for data in self.users_estates_like:
            user_index = np.where(users == data['user_id'])[0][0]
            item_index = np.where(items == data['estateId'])[0][0]
            user_favorite_matrix[user_index,
                                 item_index] = 1 if data['like'] == 'true' else 0
        self.user_favorite_matrix = user_favorite_matrix

    def build_model(self):
        self.users_estate_favourite_matrix()
        self.similarity_matrix = self.calculate_similarity(
            self.user_favorite_matrix)

    def refresh(self):
        self.build_model()

    def generate_recommendations(self, user_id):
        target_user_index = np.where(self.users == user_id)[0][0]
        similar_users = np.argsort(self.similarity_matrix[target_user_index])[
            ::-1][1:]

        target_user_favorite_items = self.user_favorite_matrix[target_user_index]
        recommendations = []
        for user_index in similar_users:
            user_favorite_items = self.user_favorite_matrix[user_index]
            new_items = np.where((user_favorite_items == 1) &
                                 (target_user_favorite_items == 0))[0]
            unique_result = [
                res_item for res_item in self.estateIds[new_items] if res_item not in recommendations]
            recommendations.extend(unique_result)
        cf_scores = {}
        for item_id in recommendations:
            cf_scores[item_id] = self.calculate_score(user_id, item_id)
        recommendations.sort(
            key=lambda item_id: cf_scores[item_id], reverse=True)
        cf_scores_results = {itemId: cf_scores[itemId]
                             for itemId in recommendations}
        return cf_scores_results

    def calculate_score(self, user_id, item_id):
        user_index = np.where(self.users == user_id)[0][0]
        item_index = np.where(self.estateIds == item_id)[0][0]

        similarity_scores = self.similarity_matrix[user_index]

        item_scores = self.user_favorite_matrix[:, item_index]

        average_score = np.mean(item_scores)

        item_scores[item_scores == 0] = average_score

        weighted_scores = similarity_scores * item_scores
        # Normalize the scores to a range of [0, 1]
        normalized_scores = weighted_scores / np.sum(similarity_scores)
        return normalized_scores[user_index]
