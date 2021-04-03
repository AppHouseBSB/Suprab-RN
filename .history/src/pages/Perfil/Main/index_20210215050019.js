import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator, Text, ScrollView} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-community/async-storage';
import {colors} from './../../../styles';
import Requisitions from './../../../Requisitions';
import DateUtils from './../../../utils/DateUtils';
import fundo from './../../../assets/images/azulEscuro.png';
import styles from './styles';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function Main({navigation}) {
  // const [data, setdata] = useState([
  //   {
  //     avatar:
  //       'iVBORw0KGgoAAAANSUhEUgAAAEQAAABUCAYAAAA7xZEpAAAMY2lDQ1BJQ0MgUHJvZmlsZQAASImVVwdYU8kWnltSSWiBUKSE3kSRGkBKCC2CgFRBVEISSCgxJgQVOyqr4NpFFMuKroq46OoKyFoQsbso9r5YUFHWxYINlTchAV195Xvn++bOf8+c+U/JTO4MADrtfJksD9UFIF9aII+PCGGNTU1jkR4CHBgBJnAHhnyBQsaJi4sGUAb6f8qbqwBR9ZdcVVzfj/9X0ReKFAIAkHSIM4UKQT7ETQDgxQKZvAAAYijU20wpkKmwGGIDOQwQ4hkqnK3Gy1Q4U4239tskxnMhbgCATOPz5dkAaLdAPatQkA15tB9C7CYVSqQA6BhAHCgQ84UQJ0I8ND9/kgrPgdgR2ssg3gExO/Mrzux/8GcO8vP52YNYnVe/kEMlClkef9r/WZr/Lfl5ygEf9rDRxPLIeFX+sIbXcydFqTAN4i5pZkysqtYQv5MI1XUHAKWKlZFJanvUTKDgwvrB3xygbkJ+aBTEZhCHS/NiojX6zCxJOA9iuFrQqZICXqJm7kKRIixBw7lePik+dgBnybkczdxavrzfr8q+RZmbxNHwXxeLeAP8r4vEiSkQUwHAqIWS5BiItSE2UOQmRKltMOsiMTdmwEaujFfFbwsxWySNCFHzY+lZ8vB4jb0sXzGQL1YilvBiNLiiQJwYqa4PtlPA74/fGOI6kZSTNMAjUoyNHshFKAoNU+eOtYqkSZp8sbuygpB4zdxuWV6cxh4ni/IiVHpriE0VhQmaufjIArg41fx4tKwgLlEdJ56Rwx8Vp44HLwTRgAtCAQsoYcsEk0AOkLR21XfBN/VIOOADOcgGIuCq0QzMSOkfkcJnAigCf0EkAorBeSH9oyJQCPWfBrXqpyvI6h8t7J+RCx5BnA+iQB58V/bPkg56SwYPoUbynXcBjDUPNtXY9zoO1ERrNMoBXpbOgCUxjBhKjCSGE51wUzwQ98ej4TMYNnecjfsORPvFnvCI0Ea4T7hCaCfcmCgpln8Ty2jQDvnDNRlnfp0xbg85vfAQPACyQ2aciZsCV9wT+uHgQdCzF9RyNXGrcmf9mzwHM/iq5ho7ihsFpRhRgimO387Udtb2GmRRVfTr+qhjzRysKndw5Fv/3K/qLIR91LeW2EJsH3YSO4qdxg5i9YCFHcEasHPYIRUeXEMP+9fQgLf4/nhyIY/kO398jU9VJRVuNW6dbh81Y6BANLVAtcG4k2TT5JJscQGLA78CIhZPKhg2lOXu5u4GgOqbov6besXs/1YgzDNfdMV3AAhI7evrO/hFFw336W9P4Dbv+qJzqAGAfhiAUwsESnmhWoerHgT4b6ADd5QJsAA2wBFm5A68gT8IBmFgFIgFiSAVTIB1FsP1LAdTwAwwF5SAMrAMrAbrwCawBewAv4C9oB4cBEfBCXAWXABXwC24fjrAM9AN3oBeBEFICB1hICaIJWKHuCDuCBsJRMKQaCQeSUUykGxEiiiRGcg8pAxZgaxDNiPVyK/IAeQochppQ24g95BO5CXyAcVQGmqAmqP26HCUjXLQKDQRHY9mo5PRInQ+ugStQKvQXWgdehQ9i15B29FnaA8GMC2MiVlhrhgb42KxWBqWhcmxWVgpVo5VYbVYI/ylL2HtWBf2HifiDJyFu8I1HIkn4QJ8Mj4LX4yvw3fgdXgLfgm/h3fjnwl0ghnBheBH4BHGErIJUwglhHLCNsJ+wnG4mzoIb4hEIpPoQPSBuzGVmEOcTlxM3EDcTWwithEfEHtIJJIJyYUUQIol8UkFpBLSWtIu0hHSRVIH6R1Zi2xJdieHk9PIUnIxuZy8k3yYfJH8mNxL0aXYUfwosRQhZRplKWUrpZFyntJB6aXqUR2oAdREag51LrWCWks9Tr1NfaWlpWWt5as1RkuiNUerQmuP1imte1rvafo0ZxqXlk5T0pbQttOaaDdor+h0uj09mJ5GL6AvoVfTj9Hv0t9pM7SHafO0hdqztSu167Qvaj/XoejY6XB0JugU6ZTr7NM5r9OlS9G11+Xq8nVn6VbqHtC9ptujx9AboRerl6+3WG+n3mm9J/okfXv9MH2h/nz9LfrH9B8wMIYNg8sQMOYxtjKOMzoMiAYOBjyDHIMyg18MWg26DfUNPQ2TDacaVhoeMmxnYkx7Jo+Zx1zK3Mu8yvxgZG7EMRIZLTKqNbpo9NZ4iHGwsci41Hi38RXjDyYskzCTXJPlJvUmd0xxU2fTMaZTTDeaHjftGmIwxH+IYEjpkL1DbpqhZs5m8WbTzbaYnTPrMbcwjzCXma81P2beZcG0CLbIsVhlcdii05JhGWgpsVxlecTyKcuQxWHlsSpYLaxuKzOrSCul1WarVqteawfrJOti693Wd2yoNmybLJtVNs023baWtqNtZ9jW2N60o9ix7cR2a+xO2r21d7BPsf/Bvt7+iYOxA8+hyKHG4bYj3THIcbJjleNlJ6IT2ynXaYPTBWfU2ctZ7FzpfN4FdfF2kbhscGkbShjqO1Q6tGroNVeaK8e10LXG9d4w5rDoYcXD6oc9H247PG348uEnh39283LLc9vqdmuE/ohRI4pHNI546e7sLnCvdL/sQfcI95jt0eDxwtPFU+S50fO6F8NrtNcPXs1en7x9vOXetd6dPrY+GT7rfa6xDdhx7MXsU74E3xDf2b4Hfd/7efsV+O31+9vf1T/Xf6f/k5EOI0Ujt458EGAdwA/YHNAeyArMCPwpsD3IKogfVBV0P9gmWBi8Lfgxx4mTw9nFeR7iFiIP2R/yluvHncltCsVCI0JLQ1vD9MOSwtaF3Q23Ds8OrwnvjvCKmB7RFEmIjIpcHnmNZ84T8Kp53aN8Rs0c1RJFi0qIWhd1P9o5Wh7dOBodPWr0ytG3Y+xipDH1sSCWF7sy9k6cQ9zkuN/HEMfEjakc8yh+RPyM+JMJjISJCTsT3iSGJC5NvJXkmKRMak7WSU5Prk5+mxKasiKlfezwsTPHnk01TZWkNqSR0pLTtqX1jAsbt3pcR7pXekn61fEO46eOPz3BdELehEMTdSbyJ+7LIGSkZOzM+MiP5VfxezJ5meszuwVcwRrBM2GwcJWwUxQgWiF6nBWQtSLrSXZA9srsTnGQuFzcJeFK1kle5ETmbMp5mxubuz23Ly8lb3c+OT8j/4BUX5orbZlkMWnqpDaZi6xE1j7Zb/Lqyd3yKPk2BaIYr2goMICH93NKR+UC5b3CwMLKwndTkqfsm6o3VTr13DTnaYumPS4KL/p5Oj5dML15htWMuTPuzeTM3DwLmZU5q3m2zez5szvmRMzZMZc6N3fuH8VuxSuKX89Lmdc433z+nPkPFkQsqCnRLpGXXPvB/4dNC/GFkoWtizwWrV30uVRYeqbMray87ONiweIzP474seLHviVZS1qXei/duIy4TLrs6vKg5TtW6K0oWvFg5eiVdatYq0pXvV49cfXpcs/yTWuoa5Rr2iuiKxrW2q5dtvbjOvG6K5UhlbvXm61ftP7tBuGGixuDN9ZuMt9UtunDT5Kfrm+O2FxXZV9VvoW4pXDLo63JW0/+zP65epvptrJtn7ZLt7fviN/RUu1TXb3TbOfSGrRGWdO5K33XhV9Cf2moda3dvJu5u2wP2KPc8/TXjF+v7o3a27yPva/2N7vf1u9n7C+tQ+qm1XXXi+vbG1Ib2g6MOtDc6N+4//dhv28/aHWw8pDhoaWHqYfnH+47UnSkp0nW1HU0++iD5onNt46NPXa5ZUxL6/Go46dOhJ84dpJz8sipgFMHT/udPnCGfab+rPfZunNe5/b/4fXH/lbv1rrzPucbLvheaGwb2Xb4YtDFo5dCL524zLt89krMlbarSVevX0u/1n5deP3JjbwbL24W3uy9Nec24XbpHd075XfN7lb96fTn7nbv9kP3Qu+du59w/9YDwYNnDxUPP3bMf0R/VP7Y8nH1E/cnBzvDOy88Hfe045nsWW9XyV96f61/7vj8t7+D/z7XPba744X8Rd/Lxa9MXm1/7fm6uSeu5+6b/De9b0vfmbzb8Z79/uSHlA+Pe6d8JH2s+OT0qfFz1Ofbffl9fTK+nN9/FMBgQ7OyAHi5HZ4TUgFgXIDnh3HqO1+/IOp7aj8C/wmr74X94g1ALexUx3VuEwB7YLOfA7nhu+qonhgMUA+PwaYRRZaHu5qLBm88hHd9fa/MASA1AvBJ3tfXu6Gv7xO8o2I3AGiarL5rqoQI7wY/BavQFePMj+AbUd9Dv8rx2x6oIvAE3/b/AjbniiH6Lz35AAAAimVYSWZNTQAqAAAACAAEARoABQAAAAEAAAA+ARsABQAAAAEAAABGASgAAwAAAAEAAgAAh2kABAAAAAEAAABOAAAAAAAAAJAAAAABAAAAkAAAAAEAA5KGAAcAAAASAAAAeKACAAQAAAABAAAARKADAAQAAAABAAAAVAAAAABBU0NJSQAAAFNjcmVlbnNob3S1iKKSAAAACXBIWXMAABYlAAAWJQFJUiTwAAAB1GlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyI+CiAgICAgICAgIDxleGlmOlBpeGVsWERpbWVuc2lvbj42ODwvZXhpZjpQaXhlbFhEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOlVzZXJDb21tZW50PlNjcmVlbnNob3Q8L2V4aWY6VXNlckNvbW1lbnQ+CiAgICAgICAgIDxleGlmOlBpeGVsWURpbWVuc2lvbj44NDwvZXhpZjpQaXhlbFlEaW1lbnNpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgrtC2wSAAAAHGlET1QAAAACAAAAAAAAACoAAAAoAAAAKgAAACoAABiGPezbYgAAGFJJREFUeAGsmnmMZNV5xb+qeq/27up1epmF6VmYAUwYQiKi2LGFUGwFwmJbMWAnXgIhgEliYgsnkaJI+SOxohiwlciSkz+CkuBIseIAxsis1jBglvEMYBkbwyzMTO9bdXV1La/qVeV37qvq6ZnBCKy8mequevXudu75zrfcjt33yvF22Ixbo922/+9LXcbO6rRt+hdd8VjM2jwU0z8e1PvoDd93Grp77uNZPXW/b3V7O91Gvbuv1ek7XN1v1YPeJxNxi91z8Gj7kqGCnZf2LLAaX/iWbMas4YVM3E2VR2niWkUTb3G/O40zBuZmvK07bWuxuESs24478Th31aOZF+8AELbcfT0bXTFrteid79tNtY9bPCHQzHiSf/TDh+7oMb5fb8p3McCJRl/H03XbcpOMRtj4vO63423W27S6n7JX5lYtdi+A/M7uMdvTk7Zqc40NSlm6EeOBBu8T0QLVsNNTDNRjBpJu4ZpFNJB+uum4Z/W8GYAba3MXEFkYNq0RBFatrNlqacUqa2ULG2oVs3Q6belU2oGR4X2bsS3hWS6XNT+ZdADHADUBQLrCMILXMaszRjx0X53zwwHZecah2nki5J56STWZUyplTx2btdh9B4+0r941attTcau3q0wtaSkBkmyymNMLXweEFSbap++vjw4C7XjCaEUfLcBg91ohANRtrVy2ysqirays2OLCvE1PnbK1VXYDBnmYay6Ts3xvj8Vpk81mrdDba4ls3mKpDJ8zFvc8vmNOjYYDZ6B/gOd7AQWQW8zAsQ9YZT5afXfxncnp1vo994i7w6NsLYz0woZVGeep4wLkxTfa1+wetYl0ApOJAPEBpOGHPM6/jglEffJZW8Kr7ZgSMaHdhuaAp0sTD2pVWy2uWKm4bKuAUFtbs3p52ZpNFpRIYBYhzGhoHex83Ko1mWq0ilQahrJb8QS/c73m+QmrVqu2xqtKv8lkynI9BRsZG7fxrdvcM6zJLY5JuTm83Y/uN9pYmag+O0B4HweQWjZtTxyfiQC5VoBkfKuFa0wyaV4Qt9BvukluNA0HED2F2IIA0aUB9BJQ7UZgS9OnbHpyyiqrJTMWHeO7NJRPxNkJwHDT4F5QF/hmZdqsVqoOhCa2LFtLAkjKi17SjgZAllbL7ncmm7NEMmPFlZKl87126a9dbpvGt7JIzYYeN8zL2W10V8NGF/132d7WJgJiogPI48cA5N4X34QhY7Yz41mtVQGQtPmNuDWlIZ1/6km2FgGiZUQdufsMIG9RDxr209detoXJN9CduLXQihy7mQUM34N9mEcC9gigOO/10oRlBlpIXOYmQLg830NQARh7ECCyirq0B4bUG00LY75j1mKxxHvPPnTlR2xi5y7u0X8HENdR9wfjdMHp4qJVtDqA+ABSgZmPH5veCIhvVTQkEU85QAIAQeNZQLdXgR8N2Ha2ynd8lldIYDKTJ0/ac888Zb3ZaNFIkg0N9lsGoZQ2hExKc/U9n8lFAtumbYgQ+r7vNlD9JXnvnmeSQbMOyaBzrQ4gdQdY0Ax537Iy9xrthE3NLlixXLEbbvyUXXDxr/A88AGuTFdAO4/EfIUJH9YvraulCXFJQwTIE0dhyD0vvdm+bteY7cglrSZRjSUtCUMkqgn8El5pfbJqHuHDT7yAcJHw1ssle/bpxy2sVaAfptau29gmwMhgKjAkjWhmYIvbKHoQEPV6YAG73gL0ZDKN9wBggPMloJhWm0nWqmVbW6s4DanX61ar1+R/HSBzy8u2Aihsh01Pz9F/2j79x7ejKxORsDuBwlFpPP07R1+4J0DwVl6raRXm+oQzmZeOtK/DZCaySasjqnHcridR7QDiNIR2wrqLcNcGpfA+A//40EF79eAPbcvoJvPaTcujR9mUB7joBkD0FPrxFjm382KUdj2EGnLDzQDxBlSxQlcCMPRqMclqBe+EvlRw0wKkgVk2adcgRllAQ5YBy0vlAKpprx5+2T587fX28U/cxEJ9kweWKcfa6l9bGfXf1TyN5QBhVx0gaQARQ+4VQwRILmVBmx2AIc7LnA1Ih17qSJR3Cs29KUzl0Qf/x4Z6MjbQm7WMH0cQoT76mUr6AJK2ZDprCXkOFh2wKIHiwQT9dn6TSWmhXXEWYE1iA3mlJppRwwvpnr5vYjJNdqLC/UqzZU30amlpxY4de8tSuR678wtftPGJHTwXmWgMaBQ3vSMgbMw6Q2Qy1xKH7MyniUMAxDxMJopDPGx0o8kIi+iKDIcV2QvPHrDnf/CYXbBrwgqwLEmDlIcZMIdEnL7SGQdKiIkpAtVeRRFmywIWaQ1NWIFW6AASO1x8IfbwipgUOrPpMjNAfCX5AQutwI6FhaLNzszZm28etZs+d4tddf3HpMxsmmJqXoDW5rVu8G76kck4kWecKgx5UnFIpCGjtgNAxBBpSNdkPDrpxiEdCDp4YPksLmS3vv/w/9qRnxy2vTu24VXQAIXCrFC2K0D8VBZQcvzOuAWLFZHZBK4veRNdWrhjAWzR97L7GmZSRzda3JPJCBDHLH3H8036r9ZDm5yctYX5RZtfKtrm7Tvtz778lzY4PkKsE6JH9BUCBpu78dKokhU5COleBTN/UpHqOYAoDnGBWROudABxrWnspFrd4jahv2KN//r3f7PSzEm7cNd5lhctoLqU3eOptEzFS8IMPAsMURu5Vi2eR5wmqU/Zuj50GSHRdaBhMg1MI8DDCKw4wqv7Afecs8YcK5jg1NScLSwW0UdYgzn96d1/ZRfs2+dMLkb8IzBivNyQDNW1fpm9xhcg1ZSPhihSRVSvwWR25Lsa4jsNCaQh/AOSjigJEL0YoKWcImGLs5P2zX++z/ygYhfvPd9SMRbaQJjJQbwEINA2gVYkSZzaEjcAkVdSP6yL323A0TZpkpquokh2HiCCWgADmxCewIzgrYlY63uZWblaB1+2y08Sh8RtdmHR3jh6HPakadOyT99yu33wyt+2pvpUcuhmItA1zun1OLcLQzzGqdHXk11AXKSaw2SU7aLQHm63oTgEk3GAOJ8eLcCxhPsJJvTWkZ/ZPX//tzaBd9m5ZQwPExhJM5dr5cQv41jC5JmIzEBmFAHLY+xoC9euz9q1FotusVuKOQLcsujMetHd0LncBuyDZlaDFYpHmrSv8Xt2YcGOnzhlCT9rTUzr5s/fZR/53WvYNxpjKRsB0ewir8N40aCsF0AID9YBue78MduOl2ngeE8DQjzBLjrXpYZc0UIkUlHg86MXnrNvfO0f7JI959v4YJ9lsNckFBUVGc1SLnsVKyL7DaGFAjOpvutLfcK2br80om2kJdppNyb3goYCM1iCKxaoVeKPCp6nRhBWhTFzi0t24tQU4p2jbNC0T/7hbfbRT9xoMSLernREcu66XP/x9oCQ/l+3e8S2I6pNAiq5XWWgLnRnUREU630wHR4RIPw++MIBe+D+f7GhXMYmxketh/BUcYgCK5UOZDbuvRjTiTV0T30ofZf5hIwhcRYYUSwiushlij1ys0SR9QqxB9oEUxXMrZLXrAGITEeArAGQAGkgnprx5R+4wj5/1xetd3AAEGG6mHLOSiKGKD3wZTLESxFD3iMg9Myuog2Ex6+9esi++U9ftTy5ysTYJhugppJK4GUQOy1cmpHifYxnWS+eMNIVgdHEA0TMEEPkWQCSBUubNH9lpFV0RJoSkw5AV4muSglFsugqJrXWeZXKazY5M0tUG5AYZm1kfKvd/dd/Y7suvKADSMduNPkNV8QQYiJMpg4gkaj+MoAghAlAeOm5Z+wb933FLtq1i8Asa/2E/9IQpege3kWg+byXbggE7ZKSOHmOkMBJO9eiL30jJsgyk8koYAsQUiV+8iw+90LEXKYTEtILlBVYskKkWiKSraIpy0SupVLViqWyZXN99pV7v2YXXHKxNQBabBMbz766kWoChtQRVQeIIlWJ6o7eDHEIGkKByA/JPCkhKgZZT//pTVYNixkAccTWX3rugP3r179qu8/bZmMDBRK7pGVBxCN1l8v1fLFDC5Tls2gtkN9SlID4IioHsFi+l3AqWk2gMYpEi6srMKBCW4DATHT5aEIKgJWXrFVW0ZUaWkLtZa0KGBVbKgdWatRs957d9uUv/YVt2jaBGUmXlGJEwJ/hZbiv/j25XQB5vBu6O0AKWQtaKtRsBCSySU1GlyguQHCECG6DhO4pe+iB+23ryCYbpuLV35sjZwEMql5iSKXKLpOrVKsIIOovZ6UkL4OiQw1qILAItywAFFtIKAVOkaLSiclJW1pZtjr3NObgwKANDQ9FugPbksQ8GB4mgbDWGrZIHDI9V8RPNm333t121ZUfth0Tu21s5y6Lk0edvthk5iFtDHmjqp7Hq8J813OZdwSE3eA/HQgJdpoJxIg34ojnY4981w48+l3bsWWzDVL7zOG64+QyihHKpOTz80tEkdPsZsW5UenDls2bbdPgkPXmcw4QCAQYqnUQiTJKta50n4SORTbRqjRpuYtOYY8qa2XMRUFaoS+P3pCEQndZY7FYtlkCtOVy0SZgbI45BGt1+71bb7VLr7gSFxyVHRwaHXSchrAml9ydAwgm05CXMeohqHXDU/ovcgsQqT4vqOXsplm18vKC/fjwYdv/2KM2zs5tGxnhWXYaUxIjFhaX2cUMzTEuBk0wIRWFlPD5smdRFYAyOTJTwC2VVl1sEU8krac' +
  //       'nj24QU6Av0haVECuAGuU1JHZVFcNbtEWfWLgKQ6VVNmBm3krlFRvp77O4gGVTdl9ykX30jrusMDpOXxLuSMTFEJ0EiO8JgY2pnmkyDhDZqkymAwhaIkRb5Cc4SMwEz4DyH331sL3+ymGXlp9466gN9hds147tzi1W0YaVlVV2sWU9vQUErochaY1Z1KoVInvcJwKpIrMSx+HRAQIqz2bn5l0mrOcVbywulWwFXVCFXhoSYHLaHDEmQ/0zRXlhgNinX64VgZ6hUFStRlny4qkTliWOGRvfYj5Cf+XNt9uui/eR0+hoJbqkJVEZFEBYVxWveBqQ8xFV0vdzGNIBJHT5AAVi+lo6ecq+/8ADVlmap6ZJIISbzaMdA1THNPGmokhFftohMlG5zjLeoMwO1qmjak9yLGqwr2CFnl4AGSb5S9nsLLsLSNO4zyIFaoGYQphL6Mk8YGXQpXw+78yFqrAND/dbX7+K0L7l8gU2B7PDxDzMaPrnr1uW8UdGx6wRb9oHP3Or7bv8/Vg8Agtbu8IqQHTvXEA6XqZB6O0YopM8Xw9CqA5DSB0BpG0/+9FB++G3v0Wqn6VATFSJmQyyqFwhZy25U3Zpbn7eZuYWbJ4cQ4Io4QugvhjRk1M0GdrY8Cbr7+uzPnY4nUlT9ZpxAVcF83DehAxZtRSG73iZKBeqY44e/Q0MDWCNcVsmJklmOK7I99hqrWknT7xla3MzNtLXT/uspRD5q/7oDjt/36UuN5KOdUH5BYAcWXe7pwHRMQRUIijip6JwZzIJqHzomf32ysP/bUOFAjvCd8QVSdjVP1ywgMUsTi7a9Ows/h+ghocRvz5Axk1SXlwjdghYUBoXJ3ZUCaiGx0bY4bzNzMxYkbKgmKAyoly3XopBFLQp41XRKEnbARjh46FWYNRKedXKVNZSgBLDzU8CyNL0lG3evMWKMHPP3ovs+ltvs9zwiPMozlTEEmblRJUVyu1WSEA7XoZsF4bslMkgiRFDIkDiAKKoQQ3lVdgQe/3lQ/YMrnYQV8ahG+ZSsCS74Ktqz2JJ+1wsIREEEyeosltFAzUAa+MSBgAziYjNz87ZEC5bxw5zc3M2Mz2NoPZYL4dQWeqwPgLbgtIKxhTFSouVC+mIU/FHkfJDsVRy7MsCqk+bInnNDKCMjI46Xbr6hk/aBygtKiuOJJTJ6AIUV3VnZucA0g3MzmaIhFTccNUmdsmjErY0PWmP/ef9FmAWaXZFJtBTyNM5qGO/Stxk1wIjCECeXYpB0wQHTiniDx+vILUvLnFwhfvczGGTAJs8dcqWYIi8QB5tGuwfoi7LrrMK3XPlAbbVnQIC9irHoGVE2h1PwB7pUE/fEP0uUacpOzONZ/L2uTvutC17LyRPkypxyQY7lzZaFTMxf0McoiIzB1UEZk5U20xah92YDCmefBPN8TaiGWrMnttrzx+wAw89aEO4t6HePMEY58Isrg6llR3rWEE7nOM4UpmuE1vlJGqNt1njJE/mMTo2atuIJgXaSWqzU1NTrn7q45qHiFX0SvJegDRhicxGBWfFIvOLi4T2gfNQFTyb8qZsT78twxClDJNT0/brBGcf/9Qf4GnyBHyKn06DIUwiL0OO9W4BsVgD9IicHCj8EiBgExCDPPKt/7DKwqxt3TTE2WyaukSLHWYyfK8Kex+mpNM3TU4UiMEuHWEuLRfdgoTOGLROpfMubqmy21Oc+BVXiu55pQkjoyM2ODiIi03CKhWZQwdKQBAn976sY1JAkbhqwclMrzXwLouLC2TIgd3853fbjvdd4gI3yOuYKCCkaQo0uxpyppd5EYbgdh1DWvL1pxlCWIR2iCG8WJQy0JBJJYlUf3rwBXv2ew/b3vO2ktAlSLJqBEUlKEgUydlrL6rvEYYmOFlT6q928xx0KwAroCEqC3joQSrTQ7QZ4pZLzmSkPRLOuflZTC9GuB4JcwaTEIhy6w3AUCpQgzFVXH0dsCT8ORiiJHJqasbez2neFVdTJHLVfkwWdsg0N17RZywBnaoy1ygO4ShTBaK3AyQuM9nQg0vTCW6MY4YGi9//0Hds9eRbtpmd1OlajWzU91rWi+36AKGKVxzzadBmdmYa1zpt/eQko5vGmBwBH+YTxzXqGFTxhty1zmpUS1lcmLKtWzchsHgvzNGJLHmQWNZoVKzGBiiUV2GR2hp/ysF5EOaLbNniSs0+dtNn7OJfvYxzaCWF1HU769AauhdGxNuz45CNDFEc0ia07mrI2wCizuRdVE9ePnHUXnz8e5blfQvqhhJexDPNzsdVK2VAl7niCSYnTxC59qErHCxR2FG84eom7KCov4wYzhKU6fQ/h81LlzZvGXXPR9qh+ITiFaYXUMOVR9MhFjeYMtV3WJLBlU9Pz3IG1Ge33fUlG98+4byb9KULiObfvWSW5wZmZwCCyWwU1bMA6XbUEP3Y/XQY2BuHXrQ3Dj9vWVijeqhUPIaeeOyynlljJ2fZeQVIoyOjRKsNBLVoy7xkMm3caRmRVcAU7ST5DqXHNIAoE5YGedIIFryKWYkhSU7BBIirqzAehwTW5lmd1ex536V2KVGpjiNiJGzuLEhz4nX29S4AOZMhyjlcAaDTmeiml3y6ItA0zJg+9nPb/8h3rD+FnRKrtDCPFiG76rE6dVsmDJfL24rW8IuchHyDZ1QzFSAK/TTVqJpm5C64aS2SAepoi8541VCiWCe4S8KGrAripASKgFVK1BlNCKCr9H3jZ2+xvZf9JmZIuQFmqOSgopR07OzrXQByLkO6ReYuGPqtzgWIG43M99TrP3FMaZJpUu6xJpNtUAuRRiwtr1gv7rlAAiitEBNkSiryRGXGqIAkEBR86XBbf3alRS6pKoZHa5IDycWP4tF6ekgR2KgWYClSLatiBjPr3CMasRs+e7Pt2XeZO5/RXzEpuJQmuYDmLER+ASAbRPUsDdHUnfWB8kZAhLoG0M4rLqHGZa/s/wGgvGAFstAQZdOpn9roD13SRJE1KlmzRKZ95BgSyDiqruaeT/DFhBWsqRhUwiwUl5RgyiTRa5s/iThv67jt2L6VhJC0noRIWiWGzZAi6O9FKrBolbbx3ACB2J9wtrsbnUPQAVmsdV7yl2JI1+2qDkH4IZpq7d1LC1TJLSYfJ5aAmMLqJLRfpML19IPftkxrDQ9DfsNklKStNTkvxi3XV0M7zoG0chYBMYKeZDPkLQio/oZMB9oCREGZ6h9VyoKqxQ6S4uc4ESiQPGYyKeaDqfFzFdCm5+dgQmirPL+CcPdt22O33vkFK2wadQEg28iTFLPo5z0w5G3ikLcBZJ0hGkRnpRqK3VKhJgYocfz/of1P25GXn7X+nj5LIIIwFrHjhSi263HCbhI8KL6gLBhzKuBSE2S0mraAd5kon3RIpUtM1N+YyHNJSNO8F8iy11nYswyb6vSzQNSrwyvLD+Fuf99+47c+RNwjs1R0jFslXXgPgGwwmXdiCLuqUrFsHXPVBzJdxlEOg/Lzy6rY+4HHHqRWsmJ9uNMwwC1SL0ko/CYgkLsVw+QdauiMJioWiNJdMKQfyk/kVfRSlJrmZF7lQhWGVIWXV1K9tUY/SwR6AsTnTznrXg+fK/Z3/3iPbd62xXk0SZb6frei+n8AAAD//+iAvcwAABniSURBVJVaebyVZbV+9jydAQ6jgsqggB7mQY0sTdKsX6mZ/jLu7d5fPyvL7i27al1NMTGyLNArKipCYo5FmgMOmSZhpMgkKKDMwzlwOAfOtOfpu8+z3v0dqP6pD/bZ3/i+az3rWcO7vh24+92d3sVjhmJkQwKlagmBQAThSgDlEBAKAPz/j5tXO8WLnufxHg9eld+BKtr378Tq115HpFBAMhxEpVpAKBJEyAuhWq2iXKqgxE+lUuX9QcSjCYRDYZQrZeRzed5fRXd3N/cziMXCSNWleF8A0VgE0UgE+XwOPbksKpy3s6cXLW2HkC+VUdfQgFywDncv+RUeuO9BXPWNb/A5yocqQqFgnw4ay9+q3PE8XucnHwzjD7sOISBAvkBARtUnUPZKROCfAMQf0QYUEISEIFWqZYSCFezbshXr33gdUR4HOGaI4KYSSQOvSuAESCFfNICCAYJRrqBKoSr8zlHhXDaHeCKKSJRA8uFwOIx4PM7nykinexFNJJAheLv37UPbkSOIJhNIJFPorUSxcctHaD1wFEseX4pZs84l0FQ4SBCO4WDySgUBIsGDXuVvATGG/EuAiCL6OCA0mecFUKJSCFQQKxaxeeVKbF3zV8SiRAMVNPVvtPsLhSKCgZA9LVDyBRkhYEIWiwUDJxaNIUwwKl6BAwcQpIVDtGAPGVEQ86h8a1sbDrS2ck4PEYIVSyZRCCbx57c3oEQQ+g08AQsXLsCkyc1kZZlzOHmDwSD00eYAqRKQ4xhyl1zmNDKkkQyhy/zzDNEE2gQKXYZ7Zn1aOUwF8j2dWPXyC0jv2Ym6aJj+56G+rp4Wo7vwnjitXC6XUaSslLDGHoqosThYpVKgG/KDoDEpRyA7OjoQicR5LYTDHYdw+OhhpPo1kS05jG2egv0dvVj8q+VoHj8avekMv5vxo5tuwqQp41HiXL67hMM0EueomiE9hOimeTLxD7vaELhrzQ7GkBMwijHk712GYvYxTUof22wkU0LnQppAG2/JZQs42tOFlr17sfP9jdi/aQMGkv6pWMgs3UBfT8QTzl1I5UA4jmg0bm7hUbB0Jo3urh7GM7KF7iY3kXKH2zuIfdCUKnCOHoLgRcIYfNIonHP+RdjbchC3zJmHfk11vMexoL6hHl1HuwjWONx5589w6mmjaQQywlycutFwMmWIRsrRLV9zgLigOqoxSYYUOViEN7ig6gNyPBjar1ZoN1FPAhKLTG8Wra0t2LFjFza/vwXr1q3HyhVvoC3bitnnn4eJY0ZhQDJsgkSiUQwcMIABM05AKRwBiYQjtHoFxVIJ2UwGOSpbppsVKI/A6TjaacBE+UyYgbWrqwsFxqHRzZNx9rmzEIzX4aGlj+CZJ5dj1NhTUCyW7D4p3tjYiF079uKLV1yKG2/8X5x44hAy0sxHtlIXyhDlJ8tx/2iA0GUuIUOUZcxlECYgsCzjA2LGJxBGOZKDUIBxCJ2dndi5cydWrVqFlW+uxKYN7yPdWyKN4xgyqAlJZpfBjSlMGDMa9V7OsoSySDweQ79+/WsBM2pBNpvNGOMsQIspDK5HyLQM2VEgSwRkhExKZ5VhAjh90lRMnjYTDQMG40+r3sIdv7gL/RtjNJayV8DGDtHqMlqqLomOw0fxuc9/FtOmTcOYMadh5IgRfLY/mUmWMualaZQ39hw+zmXq4yh6DHhBBjQ6F7Nkn7s4PN1fWe/ggYPY/N4HeGfN21j91mparBv1jXUUQhlDaS6MBBXoam/H2NNOxqxPfgxHdn9gMSPIieUaYfqsMoiCJRMPN8/chl+WWtOZLDL5vA7paoxBVKzE4/5DhmLCzE9i5MixDLz12L5jJ365YD5aWvciWVeHIoOuxvXdRgFZ/5KpFDqPdGH/jjZMPusMTJw4HpNnTMPUGZMw5fRxKMRieHUn0+4CxhAxRC5T5fRVoo9sBT2VNHLpLLK0UJYgqIbIpNN4b9N7WPXmWziwp8XSbDxBq5A9ZdI9z8CnAKngGaUSLXv2Yuq0CbjyS5dh76Y1KOV6acEiGVGwTFANhhALxxChAmHWLLQVx+RYnKsgq7He8OiTArGuoQmnjh2Hcc3j0XjCcIILtB06gsceexxP/fpxDBs9jK4il1ecYVwzUDgiD8J8Xm6pczEqHqWxqgzsuw8cYsxJ4I45N+PMiy7Cn5muAwtUh4wegsH0o4+YEVpaO5A+2I4DPS3o7OhBT2cPg1ovent7cZQBSgxprE+ahZUC5fcCQzEgzMliqQQCMjknbGs5hDOam3HTDTfgwzV/QdueLehfRxcp0Pp0gyIoYDBC14oglYqbP+eYdvJ8voNxoqunB3Gm2NOaJ6J50jSMHD2GmkaRJvBFfl5+ZQWu/+F1mDx+Klnl2CRQXWpVuiZTyLAIx5f7KKtZTUM5IwzI0XjSYlOEz37i8svRNOMcBO7fsNdLtO7C9tf/iD2HD3BgD9EiA1qU7kOBlb6FvAYT2lK8wKIoT2C07wdc1Q6xJFMiWZbP5JjbgR4qNWjQUCxaeDcqve1YsfwJDKiLIUG/LREwxQJzzCoDEp+rMDCVmHkP0wjt3Rkk+zfhvFkXYPzEKUiRIUW6o+JJmfevXbsWt/34dsaVsMlRYaVrbiIXMZa4+kUzCIwQmVui4QROJBIlW4IEJGEFX4TlxvZDnfjijXMQWLRxn7f79Zew7fkXkDppEINlEOF8Bb1gkKMAHiNxhQJoMAGgb2MEFVKWECBRIp5kXSGu5lhcFQmYBCjmCwQ1jCVLHsQpQxvx6ou/x+731uLEwQMt1UUpGBMaFS2yNilR2RLau9LoYLCuG3IKLvjCZWTYeGYy3kfwxB4xsu3gAcyfPx/r1zGlDx7AzJQ95iKW/QSDvNelaWMKZSsp+7BEkLxy0xCNKCPX8VwmFME5X/+OGLLP2//Gq/jg+ecQHlhPZaqI0Ey5cJ6VCzMLLS0gxBB9BIiCojZessyhVCgRXGHG2sF8ucambBEPPfwAzhg3Gh0t+7D6jdfQc3A/6mO0Ekv7INcoil2Uiz7dgoPtRzGmeQJmzroYI8eOt/hU4ehilNLk4cOH8egji/Hwg8vQPHEsMgRDz/qZRSBILjs+DhDJrCWCADGGqAaiQRTcozR4jxfEZ679AQL3rdvj7Xp1BTY8/VskTxqAMqvlWDlAl1HZzBRG3Uu0nkDRR+6jAKsJtb4QGAJJx5KkzOsKiDxBCwXQ3taBpcuWYtLESagW8ug63IJ3V/0JB3duRWMiTkBYxvPRDNcv777zF4z/2Pm45PIvY/Dw0ciX3VqG+nHMEuNXHi+9/BKuve47mDZphsUzMZT/bS4XOxwgqkEURCWH2CowtIDUAlEy61xQ3wzaUbpqN4W46Hs/rAHy2ktY99iTSJ0ymIB4BIQCRApmdY95XQrrUyWSYoEuCBjVFAmCIsR1TpHbB01WikQj2Lp+G5avWI5p088i+7IIM7Wnj7QZKC07PyRtWZpTo31cqJ08Zjw+d8mlGDB0OCpM/0zEHEUKewbyxg0bMG/ePGazvLmDgrrihq4L/ICUlGFsOy6GWDlAhhOQGDOMH1OUvRRv6JDoJQk+8z83InDv+j3e9lefxfrHn0TdiKEo02XijCNFBlWP9UiFQUxgOIawfiDlFKnFki4u0wVMgvEjwnP+eQOPQibIgNXvvIXnnn0RHz/3XAu0AT4XVLxg5urqPIr9e/dg+/btOHH4cIw7YzyGnDjMAmc1QGHZGiiLsgTlwIH9uO++hXjpxZdx0snDam4pMKpmJAEiNggOsdX/KH6IQpJTjPHd20AhOwIKuGHGyc4qzr/pZgQWEpCPXv4d1jKX9zt1OIqZch8gJIRZXbFDVtCEGlR004SykNJwmvVJikVRkkv8MpV1bCJ7uCwXII//+ml8/pLLcISLs83vbUCWKXzY0CEIc5y2VqZ3pvNermG6OM7ESVMwfcaZLPT6sxVAo9B6GnPFihfx7e9cjckTJ9NIXIRS9YBAoFzmwjWZfECCrHEcKC4GKi0nKJ8xSXoQCK26A9JHgHR5mCVAxJAPCchbixZjQPNIcJGJhGJIjMGTgMhl5BpqAMlSorcm1SaQBJDYo1WsApT2HaOqrA4dII8seRxnjJ9smeHp3yzFyJFTGUgD2Lu7DUObUkiyEbTr4D6OWMcapwFfu+pyzL7yKxhxygiOy1bCpk2Ye/ttaGs7yHolZYBYAWaASA7FNFeQ+cwQSFrhShaBpningkybYo0BwrKC1u1jyKdvnkOGrNvdB0gTAeEisw8QNQwCDDaKG8rzUpZjEwQX7ASIrkkIXdexD4j25UKHWg/iiiuvxN69h/C73z+KT5zzWQuQLmtwTKZS+X2Ertivqb+N8ebKjSz943j22YcxatRILLhrPh546EFMnzrZ6p/j44QZSW5IJTWfALAijfNLLinuB1IZUswRS3Q//zpAIgEU2wq48Me3HQPkLw88jP5n0CIs2xVDXFDVKkBtQDHEMUWIaGJtUl6bBvfBEjASSnyyWoS+q4XcxMkzsHvPbuzbewB1dQ1W5quNqHWKBG1orKcL5hkbcvho+x7MPHsqvnX11Vz2t+Hqb/8XXWWcm09s0KT212UYgaJNbJV7W7yoAaFAq/t1zWeP7pXMchnuMLDTI9ryuPDWvwFkMQEZaUE1VmS1aVnGASL6+R9zE04mgGy/NtHfAyLXkgtptTqCVr740i9hy5atWP7UcwyKJ3BNw3SuQinF2MMSusByvljMMsDuwfTpE/GTuXOZvcL47ne/i4OHWtky6G/pX8o5QKSWy0BSTvJRYzOC9gWEjCcG67o1hXjdZ5db9CmoMoaQIYVDeVwghtzFOuSjV57B2jvvR+osukxGkVQpi6hzQDVzpbwDxBVQop2Jw2sW3XlgLKrdq3iiZbhcK92bNkC+PPur7JfswGOP/hbDhg9lnyPHVmA9BdVIXDgyqHZ2HkEiksTP7/wJl+lT8djjj+KmOddj+pSz2YNlocgqMcB/4oMBQwVlFAOD5wwYHouZ2mQklerHM0PnffZqpR2kAFxOkSEFB8iCtQTk1Wew/tZ7Ef/USHgChMEmxMk1WYUU9dngB1TRT5uLH7bLycUYAicBKYgAEkPkzycOG4Z/+4+r0M52wP33L6a1B1IoWsc+ZS4aOwhegODl2fK7HhfM+jS2fbgF1113HWsZVZZyBWUWbTU4CIYUldEcIILIxQ0FWGVAq0oZSMUKu1d38H6f2WECwokJCtNyewkX3EaGGCCv/A7rbiMg5xKQdIVIEzL2rGyyvgndYLzQt4oUIGYq3iMAdL+BKIYo2DJ4qYwfOGgQLv3SleYmTz/9DNuEWRZI7LvQOh0dbVQ4SAA246qvXY3//Oq/04XieOLJx3DPwsWYPOk0upJ6qxzfNu5xWkd9Kso5pKz6tBTAgqheZ8g4STaeDQgDjpcNs+MBYW+Gz3MNgUpHBRfMJSDz17oss34OATl/JHshSmFEzqsBommorBQ13+TgoqF/rG/ZjCf6vkVVMUYWKnCB18A23te+fg162Gp8dNlvmDoTZE4W3eyIMRyz/XgEF174SVzBJXjz6adj//59uOab16C+ydUNVWWwPkA0mTYB4fYkg1WpdBU1iBRYVSyqCJNQAsdktKdMVBqVetDwVQ4SICBlAnKhAfLubm/bK8ux/pZ7EJ91KoJZKUYakSGmtA0oVIkiFZWfqlQ396gBpckMfH4LPB8QBcUe9jRGjhqNb37rWrzGF1i/eXIlJkw6mU0nVqrdbYiSJZs/+CvumHcvZs+ezaVDgW51L+bfMw9nTv24rWQDct9/AMSBYe5CpcS2CoGQi6pW8XshkkyyapOcYpZ0EHPMZRQPw1zM7s/iop/NI0Pe3eVte3k51s0hIJ8abQxRDCEJ7WEN5TPkGCDHMYTTEGPNZ5sE1H2+oGkCMvb0Zpw983w8/8IryGU8Nn7rWYV2E5SjFgA3bV6NH95wO6793vexbu0afP7Sz2HKhMnWZpAaAsNTlVjb+gxAZkhhMVGpXs3lJKtjMUNBXQFfritABIBu55eBZ6BwhassI5fp2tiOSxbfLZfZ423l4mvtrb9E4rxxjCF0FfIjyDdwIaLnAKFIoh2V1cCRCBdeHNyAEu6Syzbd5xZ4LsjymPm1vqGRMSaKtvYeDBgwxDruHR0tXBn32kunTe+vxnXfv4XV6Wwse2Qp7lm0ANO5mtUiTlBrbo1z/GYK8oRklJJZNp+tPcheh+QSUDovw/hA6ITGs+KMLhNk41gxxKOuR9a14oplDyLwy7X7vK0vLseaH/8UqXOb4fXSunwswta' +
  //       '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',
  //     cim: '120648',
  //     status: 'MI',
  //     lojaLodge: '1139',
  //     atualizada: '21/10/2019 18:00:00',
  //     nomeHistorico: 'Jacó',
  //     grauMaconico: 33,
  //     nome: 'Ruy Ferreira Borges',
  //     nomeLoja: 'Estrella Rioverdense',
  //     potenciaLoja: 'GOB',
  //     cidadeLoja: 'Brasília',
  //     ufLoja: 'DF',
  //     cidadeNascimento: 'Rio Verde',
  //     ufNascimento: 'GO',
  //     cpf: '021.135.461-91',
  //     dataNascimento: '26/10/1947',
  //     tipoSanguineo: 'B',
  //     titulo: 'Cruz Perfeição Maçônica',
  //     cargo: 'grão-mestre geral',
  //     endereco: 'SHIN QL 13 CONJUNTO 1 CASA 13',
  //     bairo: 'Lago Norte',
  //     cidade: 'Brasília',
  //     estado: 'DF',
  //     CEP: '71535-015',
  //     telefoneCelular: '(61) 99981-6906',
  //     telefoneFixo: '(61) 3368-5955',
  //     email: 'ruferbo@gmail.com',
  //     dtAprendiz: '20/03/1992',
  //     lojaAprendiz: 'Geraldo Rodrigues dos Santos',
  //     numLojaAprendiz: 2032,
  //     dtCompanheiro: '26/03/1993',
  //     lojaCompanheiro: 'Geraldo Rodrigues dos Santos',
  //     numLojaCompanheiro: 2032,
  //     dtMestre: '03/12/1993',
  //     lojaMestre: 'Geraldo Rodrigues dos Santos',
  //     numLojaMestre: 2032,
  //     grau: [
  //       {
  //         numero: 4,
  //         data: '06/10/1999',
  //         corpo: 'Loja de Perfeição Dom Bosco',
  //       },
  //       {
  //         numero: 7,
  //         data: '06/12/2000',
  //         corpo: 'Loja de Perfeição Dom Bosco',
  //       },
  //       {
  //         numero: 12,
  //         data: '03/10/2001',
  //         corpo: 'Loja de Perfeição Dom Bosco',
  //       },
  //       {
  //         numero: 14,
  //         data: '01/06/2002',
  //         corpo: 'Loja de Perfeição Dom Bosco',
  //       },
  //       {
  //         numero: 15,
  //         data: '17/04/2003',
  //         corpo: 'Capítulo de Cavaleiros Rosa Cruz Rosa do Planalto',
  //       },
  //       {
  //         numero: 18,
  //         data: '17/04/2003',
  //         corpo: 'Capítulo de Cavaleiros Rosa Cruz Rosa do Planalto',
  //       },
  //       {
  //         numero: 21,
  //         data: '19/08/2004',
  //         corpo: 'Capítulo de Cavaleiros Noaquitas Luz do Oriente',
  //       },
  //       {
  //         numero: 22,
  //         data: '03/03/2006',
  //         corpo: 'Conselho Filosófico de Cavaleiros Kadosch',
  //       },
  //       {
  //         numero: 29,
  //         data: '30/03/2007',
  //         corpo: 'Conselho Filosófico de Cavaleiros Kadosch',
  //       },
  //       {
  //         numero: 30,
  //         data: '18/04/2008',
  //         corpo: 'Conselho Filosófico de Cavaleiros Kadosch',
  //       },
  //       {
  //         numero: 31,
  //         data: '28/08/2009',
  //         corpo: 'Soberana Congregação Patriarcal',
  //       },
  //       {
  //         numero: 32,
  //         data: '22/10/2010',
  //         corpo: 'Soberana Congregação Patriarcal',
  //       },
  //       {
  //         numero: 33,
  //         data: '08/10/2011',
  //         corpo: 'Soberana Congregação Patriarcal',
  //       },
  //     ],
  //   },
  // ]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const login = await AsyncStorage.getItem('loginSuprab');
    const parseLogin = JSON.parse(login);
    const response = await Requisitions.membro(parseLogin.cpf, parseLogin.cgp);
    if (response.ok) {
      const responseJson = await response.json();
      debugger;
      setIsLoading(false);
      setData(responseJson);
      debugger;
    }
  }

  return (
    <>
      {isLoading ? (
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            marginTop: 50,
          }}>
          <ActivityIndicator color={colors.AMARELO_SUPRAB} size="large" />
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.containerDados}>
            <View style={styles.containerUser}>
              <View style={styles.containerProfiles}>
                <Entypo name="user" color={colors.BLACK} size={60} />
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {}}
              style={{
                marginTop: 10,
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Entypo name="images" color={colors.WHITE} size={16} />
              <Text style={styles.tituloFoto}>ALTERAR FOTO</Text>
            </TouchableOpacity>
            <View style={styles.containerDetalhe}>
              <Text style={styles.titulo}>{data.nome}</Text>
              <Text style={styles.tituloSub}>{data.cgp}</Text>
              {/* <MaterialCommunityIcons
              name="certificate-outline"
              color={colors.BLUE}
              size={25}
            />
            <Text style={styles.tituloSub}>
              {
                'Loja de Perfeição, Capitulo Rosa-Cruz, Capitulo Noaquita, Conselho de Kadosch, Consistório, Conselho Patriarcal'
              }
            </Text> */}
              <ScrollView style={styles.containerMigalha}>
                <View style={styles.containerTitulo}>
                  <Text style={styles.limiteTitulo}>Data Pessoais</Text>
                </View>
                <View style={styles.rowContainer}>
                  <Text style={styles.subTitulo}>CPF: </Text>
                  <Text style={styles.subTitulodata}>{data.cpf}</Text>
                </View>
              </ScrollView>
             {/* <View style={styles.rowContainer}>
                  <Text style={styles.subTitulo}>Data de Nascimento: </Text>
                  <Text style={styles.subTitulodata}>
                    {data.dataNascimento}
                  </Text>
                </View>
                <View style={styles.rowContainer}>
                  <Text style={styles.subTitulo}>Celular: </Text>
                  <Text style={styles.subTitulodata}>
                    {data.telefoneCelular}
                  </Text>
                </View>
                <View style={styles.rowContainer}>
                  <Text style={styles.subTitulo}>Fixo: </Text>
                  <Text style={styles.subTitulodata}>
                    {data.telefoneFixo}
                  </Text>
                </View> */}
                {/* <View style={styles.rowContainer}>
                <Text style={styles.subTitulo}>CIM: </Text>
                <Text style={styles.subTitulodata}>{data.cim}</Text>
                <Text style={styles.subTitulo}>{'      '}CPF: </Text>
                <Text style={styles.subTitulodata}>{data.cpf}</Text>
                <Text style={styles.subTitulo}>{'      '}Grau Maçônico: </Text>
                <Text style={styles.subTitulodata}>{data.grauMaconico}</Text>
              </View>
              <View style={styles.rowContainer}>
                <Text style={styles.subTitulo}>Cidade: </Text>
                <Text style={styles.subTitulodata}>
                  {data.cidadeNascimento.toUpperCase()}
                </Text>
                <Text style={styles.subTitulo}>{'      '}UF: </Text>
                <Text style={styles.subTitulodata}>
                  {data.ufNascimento.toUpperCase()}
                </Text>
              </View> */}
                {/* <View style={styles.containerTitulo}>
                  <Text style={styles.limiteTitulo}>Endereço</Text>
                </View>
                <View style={styles.rowContainer}>
                  <Text style={styles.subTitulo}>Endereço Residencial: </Text>
                  <Text style={styles.subTitulodata}>
                    {data.endereco.toUpperCase()}
                  </Text>
                </View>
                <View style={styles.rowContainer}>
                  <Text style={styles.subTitulo}>Bairo: </Text>
                  <Text style={styles.subTitulodata}>
                    {data.bairo.toUpperCase()}
                  </Text>
                </View>
                <View style={styles.rowContainer}>
                  <Text style={styles.subTitulo}>Cidade: </Text>
                  <Text style={styles.subTitulodata}>
                    {data.cidade.toUpperCase()}
                  </Text>
                </View>
                <View style={styles.rowContainer}>
                  <Text style={styles.subTitulo}>UF: </Text>
                  <Text style={styles.subTitulodata}>
                    {data.estado.toUpperCase()}
                  </Text>
                </View>
                <View style={styles.rowContainer}>
                  <Text style={styles.subTitulo}>CEP: </Text>
                  <Text style={styles.subTitulodata}>{data.CEP}</Text>
                </View> */}
                {/* <View style={styles.containerTitulo}>
                <Text style={styles.limiteTitulo}>data maçônicos</Text>
              </View>
              <View style={styles.rowContainer}>
                <Text style={styles.subTitulo}>Loja/Lodge: </Text>
                <Text style={styles.subTitulodata}>{data.lojaLodge}</Text>
                <Text style={styles.subTitulo}>{' - '}</Text>
                <Text style={styles.subTitulodata}>
                  {data.nomeLoja.toUpperCase()}
                </Text>
              </View>
              <View style={styles.rowContainer}>
                <Text style={styles.subTitulo}>Título Honorífico: </Text>
                <Text style={styles.subTitulodata}>
                  {data.titulo.toUpperCase()}
                </Text>
              </View>
              <View style={styles.rowContainer}>
                <Text style={styles.subTitulo}>Cargo: </Text>
                <Text style={styles.subTitulodata}>
                  {data.cargo.toUpperCase()}
                </Text>
              </View>
              <View style={styles.rowContainer}>
                <Text style={styles.subTitulo}>Potência da Loja: </Text>
                <Text style={styles.subTitulodata}>
                  {data.potenciaLoja.toUpperCase()}
                </Text>
              </View>
              <View style={styles.rowContainer}>
                <Text style={styles.subTitulo}>Cidade: </Text>
                <Text style={styles.subTitulodata}>{data.cidadeLoja}</Text>
                <Text style={styles.subTitulo}>{'      '}UF: </Text>
                <Text style={styles.subTitulodata}>{data.ufLoja}</Text>
              </View> */}
                {/* <View style={styles.containerTitulo}>
                <Text style={styles.limiteTitulo}>Registros maçônicos</Text>
              </View>
              <View style={styles.rowContainer}>
                <Text style={styles.subTitulo}>Aprendiz: </Text>
                <Text style={styles.subTitulodata}>
                  {data.numLojaAprendiz}
                </Text>
                <Text style={styles.subTitulo}>{' - '}</Text>
                <Text style={styles.subTitulodata}>
                  {data.lojaAprendiz.toUpperCase()}
                </Text>
              </View>
              <View style={styles.rowContainer}>
                <Text style={styles.subTitulo}>Data: </Text>
                <Text style={styles.subTitulodata}>{data.dtAprendiz}</Text>
              </View>
              <View style={styles.rowContainer}>
                <Text style={styles.subTitulo}>Companheiro: </Text>
                <Text style={styles.subTitulodata}>
                  {data.numLojaCompanheiro}
                </Text>
                <Text style={styles.subTitulo}>{' - '}</Text>
                <Text style={styles.subTitulodata}>
                  {data.lojaCompanheiro.toUpperCase()}
                </Text>
              </View>
              <View style={styles.rowContainer}>
                <Text style={styles.subTitulo}>Data: </Text>
                <Text style={styles.subTitulodata}>
                  {data.dtCompanheiro}
                </Text>
              </View>
              <View style={styles.rowContainer}>
                <Text style={styles.subTitulo}>Mestre: </Text>
                <Text style={styles.subTitulodata}>
                  {data.numLojaMestre}
                </Text>
                <Text style={styles.subTitulo}>{' - '}</Text>
                <Text style={styles.subTitulodata}>
                  {data.lojaCompanheiro.toUpperCase()}
                </Text>
              </View>
              <View style={styles.rowContainer}>
                <Text style={styles.subTitulo}>Data: </Text>
                <Text style={styles.subTitulodata}>
                  {data.dtCompanheiro}
                </Text>
              </View> */}
                {/* <View style={styles.containerTitulo}>
                  <Text style={styles.limiteTitulo}>Corpos filosóficos</Text>
                </View>
                {data.grau.map((value, index) => (
                  <>
                    <View style={styles.rowContainer}>
                      <Text style={styles.subTitulo}>
                        Grau {value.numero}: {value.data}
                      </Text>
                    </View>
                    <View style={styles.rowContainer}>
                      <Text style={styles.subTitulodata}>
                        Grau {value.numero}: {value.corpo}
                      </Text>
                    </View>
                  </>
                ))}
                <View style={{marginBottom: 120}} /> */}
              {/* </ScrollView> */}
            </View>
          </View>
        </View>
      )}
    </>
  );
}
