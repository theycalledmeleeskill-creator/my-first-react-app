from rest_framework.response import Response
from rest_framework.decorators import api_view
@api_view (['GET'])
def get_user_profile(request):
    user_data={
        "name":"Ko Ye Yint Aung",
        "role":"Back End Developer",
        "skills":["pyton","html","css","sql"]
    }
    return Response(user_data)
    