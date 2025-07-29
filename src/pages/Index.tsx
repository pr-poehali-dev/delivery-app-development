import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface DeliveryPoint {
  id: string;
  name: string;
  address: string;
  phone: string;
  region: string;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  lat: number;
  lng: number;
}

interface DeliveryTask {
  id: string;
  storeName: string;
  address: string;
  phone: string;
  region: string;
  status: 'pending' | 'delivered' | 'failed';
  deliveryTime: string;
  items: number;
}

const Index = () => {
  const [selectedRegion, setSelectedRegion] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPoint, setSelectedPoint] = useState<DeliveryPoint | null>(null);

  // Mock data
  const regions = ['Чиланзар', 'Юнусабад', 'Мирзо-Улугбек', 'Сергели', 'Яшнабад'];
  
  const deliveryPoints: DeliveryPoint[] = [
    {
      id: '1',
      name: 'Супермаркет "Корзинка"',
      address: 'ул. Амира Темура, 15',
      phone: '+998 90 123 45 67',
      region: 'Чиланзар',
      status: 'pending',
      lat: 41.2995,
      lng: 69.2401
    },
    {
      id: '2',
      name: 'Ресторан "Плов центр"',
      address: 'пр. Мустакиллик, 23',
      phone: '+998 90 765 43 21',
      region: 'Юнусабад',
      status: 'in-progress',
      lat: 41.3123,
      lng: 69.2789
    },
    {
      id: '3',
      name: 'Аптека "Фармация"',
      address: 'ул. Навои, 45',
      phone: '+998 90 987 65 43',
      region: 'Мирзо-Улугбек',
      status: 'completed',
      lat: 41.2856,
      lng: 69.2034
    }
  ];

  const deliveryTasks: DeliveryTask[] = [
    {
      id: '1',
      storeName: 'Супермаркет "Корзинка"',
      address: 'ул. Амира Темура, 15',
      phone: '+998 90 123 45 67',
      region: 'Чиланзар',
      status: 'pending',
      deliveryTime: '14:30',
      items: 3
    },
    {
      id: '2',
      storeName: 'Ресторан "Плов центр"',
      address: 'пр. Мустакиллик, 23',
      phone: '+998 90 765 43 21',
      region: 'Юнусабад',
      status: 'delivered',
      deliveryTime: '12:15',
      items: 1
    },
    {
      id: '3',
      storeName: 'Кафе "Лагман"',
      address: 'ул. Бобура, 12',
      phone: '+998 90 555 44 33',
      region: 'Сергели',
      status: 'pending',
      deliveryTime: '16:00',
      items: 2
    }
  ];

  const filteredPoints = deliveryPoints.filter(point => 
    (selectedRegion === '' || point.region === selectedRegion) &&
    (searchQuery === '' || point.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
     point.address.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'in-progress': return 'bg-blue-500';
      case 'delivered': return 'bg-green-500';
      case 'completed': return 'bg-green-500';
      case 'failed': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Ожидает';
      case 'in-progress': return 'В пути';
      case 'delivered': return 'Доставлен';
      case 'completed': return 'Завершен';
      case 'failed': return 'Не доставлен';
      default: return status;
    }
  };

  const courierStats = {
    name: 'Алишер Каримов',
    rating: 4.8,
    todayDeliveries: 12,
    totalDeliveries: 847,
    efficiency: 96
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Truck" size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Курьер</h1>
                <p className="text-xs text-gray-500">Система доставки</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-xs">RU</Badge>
              <Avatar className="w-8 h-8">
                <AvatarImage src="" />
                <AvatarFallback className="text-xs bg-primary text-white">АК</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto">
        <Tabs defaultValue="map" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mx-4 mt-4">
            <TabsTrigger value="map" className="text-xs">
              <Icon name="Map" size={16} className="mr-1" />
              Карта
            </TabsTrigger>
            <TabsTrigger value="tasks" className="text-xs">
              <Icon name="CheckSquare" size={16} className="mr-1" />
              Задачи
            </TabsTrigger>
            <TabsTrigger value="profile" className="text-xs">
              <Icon name="User" size={16} className="mr-1" />
              Профиль
            </TabsTrigger>
            <TabsTrigger value="admin" className="text-xs">
              <Icon name="Settings" size={16} className="mr-1" />
              Админ
            </TabsTrigger>
          </TabsList>

          {/* Map Tab */}
          <TabsContent value="map" className="p-4 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Поиск по районам..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Region Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              <Button
                variant={selectedRegion === '' ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedRegion('')}
                className="whitespace-nowrap"
              >
                Все
              </Button>
              {regions.map((region) => (
                <Button
                  key={region}
                  variant={selectedRegion === region ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedRegion(region)}
                  className="whitespace-nowrap"
                >
                  {region}
                </Button>
              ))}
            </div>

            {/* Map Placeholder */}
            <Card className="h-64 bg-gray-100 border-2 border-dashed border-gray-300">
              <CardContent className="h-full flex items-center justify-center">
                <div className="text-center">
                  <Icon name="Map" size={48} className="text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">Интерактивная карта</p>
                  <p className="text-gray-400 text-xs">Google Maps интеграция</p>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Points */}
            <div className="space-y-3">
              <h3 className="font-medium text-gray-900">Точки доставки ({filteredPoints.length})</h3>
              {filteredPoints.map((point) => (
                <Card key={point.id} className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => setSelectedPoint(point)}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium text-sm">{point.name}</h4>
                          <Badge className={`${getStatusColor(point.status)} text-white text-xs`}>
                            {getStatusText(point.status)}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-500 mb-1">{point.address}</p>
                        <p className="text-xs text-gray-400">{point.phone}</p>
                      </div>
                      <div className="flex flex-col items-end space-y-1">
                        <Badge variant="outline" className="text-xs">{point.region}</Badge>
                        <Icon name="MapPin" size={16} className="text-gray-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tasks Tab */}
          <TabsContent value="tasks" className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-gray-900">Задачи на сегодня</h3>
              <Badge className="bg-primary text-white">
                {deliveryTasks.filter(t => t.status === 'pending').length} активных
              </Badge>
            </div>

            <div className="space-y-3">
              {deliveryTasks.map((task) => (
                <Card key={task.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm mb-1">{task.storeName}</h4>
                        <p className="text-xs text-gray-500 mb-1">{task.address}</p>
                        <div className="flex items-center space-x-3 text-xs text-gray-400">
                          <span className="flex items-center">
                            <Icon name="Clock" size={12} className="mr-1" />
                            {task.deliveryTime}
                          </span>
                          <span className="flex items-center">
                            <Icon name="Package" size={12} className="mr-1" />
                            {task.items} товара
                          </span>
                        </div>
                      </div>
                      <Badge className={`${getStatusColor(task.status)} text-white text-xs`}>
                        {getStatusText(task.status)}
                      </Badge>
                    </div>

                    {task.status === 'pending' && (
                      <div className="flex space-x-2">
                        <Button size="sm" className="flex-1 bg-success hover:bg-success/90">
                          <Icon name="Check" size={16} className="mr-1" />
                          Доставлен
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 text-destructive border-destructive">
                          <Icon name="X" size={16} className="mr-1" />
                          Не доставлен
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="p-4 space-y-4">
            <Card>
              <CardContent className="p-6 text-center">
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarImage src="" />
                  <AvatarFallback className="text-lg bg-primary text-white">АК</AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-lg text-gray-900">{courierStats.name}</h3>
                <div className="flex items-center justify-center space-x-1 mt-1">
                  <Icon name="Star" size={16} className="text-yellow-500 fill-current" />
                  <span className="text-sm text-gray-600">{courierStats.rating}</span>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary mb-1">{courierStats.todayDeliveries}</div>
                  <div className="text-xs text-gray-500">Сегодня</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-secondary mb-1">{courierStats.totalDeliveries}</div>
                  <div className="text-xs text-gray-500">Всего</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Эффективность</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Успешные доставки</span>
                  <span className="text-sm font-medium">{courierStats.efficiency}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-success h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${courierStats.efficiency}%` }}
                  ></div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-2">
              <Button className="w-full" variant="outline">
                <Icon name="Settings" size={16} className="mr-2" />
                Настройки
              </Button>
              <Button className="w-full" variant="outline">
                <Icon name="Globe" size={16} className="mr-2" />
                Язык: Русский
              </Button>
              <Button className="w-full" variant="outline" className="text-destructive border-destructive">
                <Icon name="LogOut" size={16} className="mr-2" />
                Выйти
              </Button>
            </div>
          </TabsContent>

          {/* Admin Tab */}
          <TabsContent value="admin" className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-gray-900">Админ панель</h3>
              <Button size="sm">
                <Icon name="Plus" size={16} className="mr-1" />
                Добавить
              </Button>
            </div>

            <div className="space-y-3">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-sm">Управление точками</h4>
                      <p className="text-xs text-gray-500">Добавить, изменить, удалить</p>
                    </div>
                    <Icon name="ChevronRight" size={20} className="text-gray-400" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-sm">Статистика</h4>
                      <p className="text-xs text-gray-500">Отчеты и аналитика</p>
                    </div>
                    <Icon name="ChevronRight" size={20} className="text-gray-400" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-sm">Курьеры</h4>
                      <p className="text-xs text-gray-500">Управление персоналом</p>
                    </div>
                    <Icon name="ChevronRight" size={20} className="text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon name="AlertTriangle" size={20} className="text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm text-yellow-800">Доступ ограничен</h4>
                  <p className="text-xs text-yellow-700 mt-1">
                    Для полного доступа к админ-панели требуются права администратора.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Selected Point Modal */}
      {selectedPoint && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="bg-white w-full max-w-md mx-auto rounded-t-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">{selectedPoint.name}</h3>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setSelectedPoint(null)}
              >
                <Icon name="X" size={20} />
              </Button>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Icon name="MapPin" size={20} className="text-gray-400" />
                <span className="text-sm">{selectedPoint.address}</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Icon name="Phone" size={20} className="text-gray-400" />
                <span className="text-sm">{selectedPoint.phone}</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Icon name="Tag" size={20} className="text-gray-400" />
                <Badge variant="outline">{selectedPoint.region}</Badge>
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <Button className="flex-1">
                <Icon name="Navigation" size={16} className="mr-2" />
                Открыть в картах
              </Button>
              <Button variant="outline" className="flex-1">
                <Icon name="Phone" size={16} className="mr-2" />
                Позвонить
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;