---
layout: post
#date:   2016-06-09 22:41:15 +0100
#categories: jekyll update
title: Oportunidades unicas
articleClass: ArticleCards

promotions:
    - title: Viagens surfistas
      text: Se estás flat num spot, a Rede Expressos pode levar-te <span class="nowrap">a outro.</span>
      img: surfFriends
      link: #
    - title: Viagens para aeroporto
      text: Se vais seguir viagem para o aeroporto do Porto... tenha <span class="nowrap">desconto exclusivo!</span>
      img: plainSky
      link: #
    - title: Descontos 3D
      text: Compre online 3 dias antes e receba 30% <span class="nowrap">de desconto.</span>
      img: phoneHand
      link: #
    - title: Descontos Jovem
      text: Aqui tu cresces connosco! Os descontos também <span class="nowrap">até 25%.</span>
      img: girlStreet
      link: #
---

<div class="ArticleCards-title">
    <h3 class="f-h3">{{page.title}}</h3>
</div>
<dl class="CardsDl">
    {% for card in page.promotions %}
    <dt class="sr-only">{{card.title}}</dt>
    <dd class="CardsDl-dd">
        <a href="{{card.link}}">
            <span class="imgBgCard-{{card.img}}"></span>
            <span class="CardsDl-dd-text">
                {{card.text}}
            </span>
        </a>
    </dd>
    {% endfor %}
</dl>
